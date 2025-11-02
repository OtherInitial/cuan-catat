import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cuan Catat: Platform Pencatat Keuangan Untuk UMKM',
    short_name: 'Cuan-Catat',
    description: 'Plarform Pencatat Keuangan untuk UMKM Kelurahan Pongangan',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/ikon_apk.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}