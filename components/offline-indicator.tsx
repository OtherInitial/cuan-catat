"use client"

import { useOfflineSyncStore } from "@/lib/offline-sync-store"
import { AlertCircle, CheckCircle2, WifiOff, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export function OfflineIndicator() {
  const { isOnline, isSyncing, lastSyncTime, pendingCount, syncError } = useOfflineSyncStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isOnline && !isSyncing && !syncError) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {!isOnline && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-3 shadow-lg dark:bg-orange-950 dark:border-orange-800">
          <WifiOff className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Anda sedang offline</p>
            <p className="text-xs text-orange-700 dark:text-orange-200 mt-1">
              Data akan disimpan secara lokal dan tersinkronisasi saat online
            </p>
          </div>
        </div>
      )}

      {isSyncing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 shadow-lg dark:bg-blue-950 dark:border-blue-800">
          <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Menyinkronkan data...</p>
            {pendingCount > 0 && (
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                {pendingCount} item menunggu untuk disinkronkan
              </p>
            )}
          </div>
        </div>
      )}

      {syncError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 shadow-lg dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-900 dark:text-red-100">Gagal menyinkronkan</p>
            <p className="text-xs text-red-700 dark:text-red-200 mt-1">{syncError}</p>
          </div>
        </div>
      )}

      {isOnline && !isSyncing && lastSyncTime && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-3 shadow-lg dark:bg-green-950 dark:border-green-800">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">Tersinkronisasi</p>
            <p className="text-xs text-green-700 dark:text-green-200 mt-1">
              Sinkronisasi terakhir: {lastSyncTime.toLocaleTimeString("id-ID")}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
