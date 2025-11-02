import { offlineDB } from "./offline-db"

export interface SyncResult {
  success: boolean
  syncedItems: number
  failedItems: number
  errors: Array<{ id: string; error: string }>
}

let isSyncing = false
let syncListeners: Array<(result: SyncResult) => void> = []

export const syncManager = {
  onSync(callback: (result: SyncResult) => void) {
    syncListeners.push(callback)
    return () => {
      syncListeners = syncListeners.filter((cb) => cb !== callback)
    }
  },

  notifyListeners(result: SyncResult) {
    syncListeners.forEach((callback) => callback(result))
  },

  async syncPendingData(token: string): Promise<SyncResult> {
    if (isSyncing) {
      console.log("[sync] Already syncing, skipping")
      return { success: false, syncedItems: 0, failedItems: 0, errors: [] }
    }

    isSyncing = true
    const result: SyncResult = {
      success: true,
      syncedItems: 0,
      failedItems: 0,
      errors: [],
    }

    try {
      const queueItems = await offlineDB.getQueueItems("PENDING")

      if (queueItems.length === 0) {
        console.log("[sync] No items to sync")
        isSyncing = false
        return result
      }

      console.log(`[sync] Starting sync of ${queueItems.length} items`)

      for (const item of queueItems) {
        try {
          const response = await fetch(item.endpoint, {
            method: item.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: item.method !== "DELETE" ? JSON.stringify(item.data) : undefined,
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          await offlineDB.updateQueueItem(item.id, {
            status: "SYNCED",
            attempts: item.attempts + 1,
          })

          result.syncedItems++
          console.log(`[sync] ✓ Synced ${item.type}: ${item.id}`)
        } catch (error) {
          result.failedItems++
          result.errors.push({
            id: item.id,
            error: error instanceof Error ? error.message : "Unknown error",
          })

          const newAttempts = item.attempts + 1
          const maxAttempts = 5

          if (newAttempts >= maxAttempts) {
            await offlineDB.updateQueueItem(item.id, {
              status: "FAILED",
              attempts: newAttempts,
              error: `Failed after ${maxAttempts} attempts`,
            })
          } else {
            await offlineDB.updateQueueItem(item.id, {
              attempts: newAttempts,
              error: error instanceof Error ? error.message : "Unknown error",
            })
          }

          console.error(`[sync] ✗ Failed to sync ${item.type}: ${item.id}`, error)
        }
      }

      result.success = result.failedItems === 0
      console.log(`[sync] Sync complete: ${result.syncedItems} synced, ${result.failedItems} failed`)
    } catch (error) {
      console.error("[sync] Fatal sync error:", error)
      result.success = false
    } finally {
      isSyncing = false
      this.notifyListeners(result)
    }

    return result
  },

  async retryFailedItems(token: string): Promise<SyncResult> {
    const failedItems = await offlineDB.getQueueItems("FAILED")

    // Reset failed items to pending for retry
    for (const item of failedItems) {
      await offlineDB.updateQueueItem(item.id, {
        status: "PENDING",
        attempts: 0,
        error: undefined,
      })
    }

    return this.syncPendingData(token)
  },

  isSyncing(): boolean {
    return isSyncing
  },
}
