import { create } from "zustand"

interface OfflineSyncStore {
  isOnline: boolean
  setIsOnline: (online: boolean) => void
  isSyncing: boolean
  setIsSyncing: (syncing: boolean) => void
  lastSyncTime: Date | null
  setLastSyncTime: (time: Date) => void
  pendingCount: number
  setPendingCount: (count: number) => void
  syncError: string | null
  setSyncError: (error: string | null) => void
}

export const useOfflineSyncStore = create<OfflineSyncStore>((set) => ({
  isOnline: typeof window !== "undefined" ? navigator.onLine : true,
  setIsOnline: (online) => set({ isOnline: online }),
  isSyncing: false,
  setIsSyncing: (syncing) => set({ isSyncing: syncing }),
  lastSyncTime: null,
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
  pendingCount: 0,
  setPendingCount: (count) => set({ pendingCount: count }),
  syncError: null,
  setSyncError: (error) => set({ syncError: error }),
}))
