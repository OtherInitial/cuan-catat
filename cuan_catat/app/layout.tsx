import "./globals.css"

import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import NextJsTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google"
import { SyncWrapper } from "@/components/sync-wrapper"

import { SheetProvider } from "@/providers/sheet-provider"
import { PWAStatus } from "@/components/pwa-status"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Cuan Catat",
  description: "Platform Pencatat Keuangan untuk UMKM Kelurahan Pongangan",
  manifest: "/manifest.json",
  keywords: ["finance", "cost", "umkm"],
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#fff",
    },
  ],
  authors: [
    {
      name: "blaxx",
      url: "https://hadideveloper.vercel.app",
    },
  ],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cuan Catat",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/ikon_apk.ico",
  },
  applicationName: "Cuan Catat",
  openGraph: {
    title: "Cuan Catat",
    description: "Platform Pencatat Keuangan untuk UMKM",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cuan Catat" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.className}`} style={{ overflowY: "auto" }}>
        <NextJsTopLoader />
        <SyncWrapper>
          <SheetProvider />
          {children}
          <Toaster richColors position="top-right" />
          {process.env.NODE_ENV === "development" && <PWAStatus />}
        </SyncWrapper>
      </body>
    </html>
  )
}
