"use client"

import { useEffect, useState } from "react"

export function PWAStatus() {
  const [status, setStatus] = useState<string>("Checking PWA status...")
  const [details, setDetails] = useState<Record<string, any>>({})

  useEffect(() => {
    const checkPWA = async () => {
      try {
        const checks = {
          manifestFound: false,
          manifestValid: false,
          serviceWorkerRegistered: false,
          httpsEnabled: window.location.protocol === "https:",
          manifestContent: null as any,
          errors: [] as string[],
        }

        // Check manifest
        const manifestLink = document.querySelector('link[rel="manifest"]')
        checks.manifestFound = !!manifestLink

        if (!checks.manifestFound) {
          checks.errors.push("❌ Manifest link tidak ditemukan di HTML")
        }

        // Fetch manifest
        try {
          const response = await fetch("/manifest.json")
          if (response.ok) {
            checks.manifestValid = true
            checks.manifestContent = await response.json()
            console.log("[v0] Manifest content:", checks.manifestContent)
          } else {
            checks.errors.push(`❌ Manifest gagal di-load (Status: ${response.status})`)
          }
        } catch (e) {
          checks.errors.push(`❌ Manifest error: ${String(e)}`)
        }

        // Check service worker
        if ("serviceWorker" in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready
            checks.serviceWorkerRegistered = !!registration
            console.log("[v0] Service Worker registered:", registration)
          } catch (e) {
            checks.errors.push(`❌ Service Worker error: ${String(e)}`)
          }
        } else {
          checks.errors.push("❌ Service Worker tidak didukung browser ini")
        }

        // Check HTTPS
        if (!checks.httpsEnabled) {
          checks.errors.push("❌ Aplikasi tidak menggunakan HTTPS (Required untuk PWA)")
        }

        // Check icons
        if (checks.manifestContent?.icons) {
          for (const icon of checks.manifestContent.icons) {
            try {
              const iconResponse = await fetch(icon.src)
              if (!iconResponse.ok) {
                checks.errors.push(`❌ Icon tidak ditemukan: ${icon.src}`)
              } else {
                console.log(`[v0] Icon tersedia: ${icon.src} (${icon.sizes})`)
              }
            } catch (e) {
              checks.errors.push(`❌ Icon error: ${icon.src}`)
            }
          }
        }

        const isReady =
          checks.manifestValid && checks.serviceWorkerRegistered && checks.httpsEnabled && checks.errors.length === 0

        if (isReady) {
          setStatus("✅ PWA siap untuk di-install!")
        } else {
          setStatus(`⚠️ Ada ${checks.errors.length} masalah ditemukan`)
        }

        setDetails(checks)
      } catch (error) {
        console.error("[v0] PWA check error:", error)
        setStatus("❌ Error saat check PWA")
      }
    }

    checkPWA()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg text-sm max-w-md z-50 overflow-y-auto max-h-96">
      <div className="font-bold mb-2">{status}</div>

      <div className="space-y-1 text-xs">
        <div>
          <strong>HTTPS:</strong> {details.httpsEnabled ? "✅" : "❌"}
        </div>
        <div>
          <strong>Manifest:</strong> {details.manifestFound ? "✅" : "❌"}
        </div>
        <div>
          <strong>Manifest Valid:</strong> {details.manifestValid ? "✅" : "❌"}
        </div>
        <div>
          <strong>Service Worker:</strong> {details.serviceWorkerRegistered ? "✅" : "❌"}
        </div>
      </div>

      {details.errors && details.errors.length > 0 && (
        <div className="mt-2 p-2 bg-red-900/50 rounded">
          <strong className="text-red-200">Errors:</strong>
          <ul className="mt-1 space-y-1">
            {details.errors.map((error: string, i: number) => (
              <li key={i} className="text-red-300">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-300">Check console browser (F12) untuk detail lebih lanjut</div>
    </div>
  )
}
