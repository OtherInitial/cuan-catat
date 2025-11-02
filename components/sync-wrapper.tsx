"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import { OfflineIndicator } from "./offline-indicator"

interface SyncWrapperProps {
  children: React.ReactNode
}

export function SyncWrapper({ children }: SyncWrapperProps) {
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token")
    setToken(storedToken || undefined)
  }, [])

  useOfflineSync(token)

  return (
    <>
      {children}
      <OfflineIndicator />
    </>
  )
}
