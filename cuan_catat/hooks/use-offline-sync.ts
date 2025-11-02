"use client"

import { useEffect, useCallback, useRef } from "react"
import { useOfflineSyncStore } from "@/lib/offline-sync-store"
import { syncManager } from "@/lib/sync-manager"
import { offlineDB } from "@/lib/offline-db"

export function useOfflineSync(token?: string) {
  const { setIsOnline, setIsSyncing, setLastSyncTime, setPendingCount, setSyncError } = useOfflineSyncStore()
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = async () => {
      console.log("[offline-sync] Device came online")
      setIsOnline(true)
      setSyncError(null)

      if (token) {
        await performSync()
      }
    }

    const handleOffline = () => {
      console.log("[offline-sync] Device went offline")
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [token, setIsOnline, setSyncError])

  const performSync = useCallback(async () => {
    if (!token) return

    setIsSyncing(true)
    try {
      const result = await syncManager.syncPendingData(token)
      setLastSyncTime(new Date())

      if (!result.success && result.errors.length > 0) {
        setSyncError(`Failed to sync ${result.failedItems} items`)
      } else {
        setSyncError(null)
      }
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "Sync failed")
      console.error("[offline-sync] Sync error:", error)
    } finally {
      setIsSyncing(false)
      updatePendingCount()
    }
  }, [token, setIsSyncing, setLastSyncTime, setSyncError])

  const updatePendingCount = useCallback(async () => {
    try {
      const pending = await offlineDB.getQueueItems("PENDING")
      setPendingCount(pending.length)
    } catch (error) {
      console.error("[offline-sync] Error updating pending count:", error)
    }
  }, [setPendingCount])

  // Periodic sync attempt (every 30 seconds)
  useEffect(() => {
    if (!token) return

    const scheduleSync = () => {
      syncTimeoutRef.current = setTimeout(() => {
        if (navigator.onLine) {
          performSync()
        }
        scheduleSync()
      }, 30000)
    }

    scheduleSync()
    updatePendingCount()

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current)
      }
    }
  }, [token, performSync, updatePendingCount])

  // Listen to sync events
  useEffect(() => {
    const unsubscribe = syncManager.onSync((result) => {
      updatePendingCount()
    })

    return unsubscribe
  }, [updatePendingCount])

  return { performSync, updatePendingCount }
}
