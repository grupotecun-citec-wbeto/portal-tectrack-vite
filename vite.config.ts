import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx,js,ts}",
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        globIgnores: [
          '**/signInImage*.png',
          '**/BgSignUp*.png',
          '**/assets/img/**/*.png'
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Portal TecTrack',
        short_name: 'TecTrack',
        description: 'Portal TecTrack - Gestión de casos técnicos',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  
  // Configuración para preview (producción)
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    allowedHosts: [
      'tectrack-vite2-58928188038.us-central1.run.app',
      'localhost',
      '127.0.0.1'
    ]
  },
  
  // Configuración para desarrollo
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para la carpeta src
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@dashboard': path.resolve(__dirname, './src/features/tsnocheck/dashboard')

    }
  },
  define: {
    'process.env': {}
  }
})