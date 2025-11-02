// This handles all offline data management and queuing

export interface OfflineTransaction {
  id: string
  userId: string
  itemName: string
  date: string
  type: "INCOME" | "EXPENSE"
  amount: number
  note?: string | null
  paymentMethodId: string
  productId?: string | null
  categoryId?: string | null
  itemMappingId?: number
  createdAt: string
  status: "PENDING" | "SYNCED" | "FAILED"
  error?: string
}

export interface SyncQueue {
  id: string
  type: "TRANSACTION" | "PRODUCT" | "RAW_MATERIAL" | "DELETE"
  data: any
  endpoint: string
  method: "POST" | "PUT" | "DELETE"
  status: "PENDING" | "SYNCED" | "FAILED"
  attempts: number
  error?: string
  createdAt: string
  updatedAt: string
}

const DB_NAME = "CuanCatat"
const DB_VERSION = 1
const STORES = {
  TRANSACTIONS: "offline_transactions",
  SYNC_QUEUE: "sync_queue",
  METADATA: "metadata",
}

let db: IDBDatabase | null = null

export const offlineDB = {
  async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (db) {
        resolve(db)
        return
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        db = request.result
        resolve(db)
      }

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result

        // Create transactions store
        if (!database.objectStoreNames.contains(STORES.TRANSACTIONS)) {
          const txStore = database.createObjectStore(STORES.TRANSACTIONS, {
            keyPath: "id",
          })
          txStore.createIndex("userId", "userId", { unique: false })
          txStore.createIndex("status", "status", { unique: false })
          txStore.createIndex("date", "date", { unique: false })
        }

        // Create sync queue store
        if (!database.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
          const queueStore = database.createObjectStore(STORES.SYNC_QUEUE, {
            keyPath: "id",
          })
          queueStore.createIndex("status", "status", { unique: false })
          queueStore.createIndex("type", "type", { unique: false })
          queueStore.createIndex("createdAt", "createdAt", { unique: false })
        }

        // Create metadata store
        if (!database.objectStoreNames.contains(STORES.METADATA)) {
          database.createObjectStore(STORES.METADATA, { keyPath: "key" })
        }
      }
    })
  },

  // Transaction methods
  async addTransaction(transaction: OfflineTransaction): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS], "readwrite")
      const store = tx.objectStore(STORES.TRANSACTIONS)
      const request = store.add(transaction)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  },

  async updateTransaction(id: string, updates: Partial<OfflineTransaction>): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS], "readwrite")
      const store = tx.objectStore(STORES.TRANSACTIONS)
      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const transaction = getRequest.result
        if (!transaction) {
          reject(new Error("Transaction not found"))
          return
        }

        const updated = { ...transaction, ...updates }
        const putRequest = store.put(updated)

        putRequest.onerror = () => reject(putRequest.error)
        putRequest.onsuccess = () => resolve()
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  },

  async getTransactionsByUser(userId: string): Promise<OfflineTransaction[]> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS], "readonly")
      const store = tx.objectStore(STORES.TRANSACTIONS)
      const index = store.index("userId")
      const request = index.getAll(userId)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  },

  async getPendingTransactions(userId: string): Promise<OfflineTransaction[]> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS], "readonly")
      const store = tx.objectStore(STORES.TRANSACTIONS)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const transactions = request.result.filter((t) => t.userId === userId && t.status === "PENDING")
        resolve(transactions)
      }
    })
  },

  async deleteTransaction(id: string): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS], "readwrite")
      const store = tx.objectStore(STORES.TRANSACTIONS)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  },

  // Sync Queue methods
  async addToQueue(item: SyncQueue): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.SYNC_QUEUE], "readwrite")
      const store = tx.objectStore(STORES.SYNC_QUEUE)
      const request = store.add(item)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  },

  async getQueueItems(status: "PENDING" | "SYNCED" | "FAILED" = "PENDING"): Promise<SyncQueue[]> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.SYNC_QUEUE], "readonly")
      const store = tx.objectStore(STORES.SYNC_QUEUE)
      const index = store.index("status")
      const request = index.getAll(status)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  },

  async updateQueueItem(id: string, updates: Partial<SyncQueue>): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.SYNC_QUEUE], "readwrite")
      const store = tx.objectStore(STORES.SYNC_QUEUE)
      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const item = getRequest.result
        if (!item) {
          reject(new Error("Queue item not found"))
          return
        }

        const updated = { ...item, ...updates, updatedAt: new Date().toISOString() }
        const putRequest = store.put(updated)

        putRequest.onerror = () => reject(putRequest.error)
        putRequest.onsuccess = () => resolve()
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  },

  async deleteQueueItem(id: string): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.SYNC_QUEUE], "readwrite")
      const store = tx.objectStore(STORES.SYNC_QUEUE)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  },

  async setMetadata(key: string, value: any): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.METADATA], "readwrite")
      const store = tx.objectStore(STORES.METADATA)
      const request = store.put({ key, value, updatedAt: new Date().toISOString() })

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  },

  async getMetadata(key: string): Promise<any> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.METADATA], "readonly")
      const store = tx.objectStore(STORES.METADATA)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result?.value)
    })
  },

  async clearAllData(): Promise<void> {
    const database = await this.init()
    return new Promise((resolve, reject) => {
      const tx = database.transaction([STORES.TRANSACTIONS, STORES.SYNC_QUEUE, STORES.METADATA], "readwrite")

      const txClear = tx.objectStore(STORES.TRANSACTIONS).clear()
      const queueClear = tx.objectStore(STORES.SYNC_QUEUE).clear()
      const metaClear = tx.objectStore(STORES.METADATA).clear()

      tx.onerror = () => reject(tx.error)
      tx.oncomplete = () => resolve()
    })
  },
}
