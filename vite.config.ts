import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'cesium': path.resolve(__dirname, "./public/lib2/Cesium.js")
    }
  },
  server: {
    fs: {
      strict:false //lmw add 4 消除html文件中引入cesium的警告
    }
  },
  optimizeDeps: {
    include: ['cesium']
  },
  build: {
    rollupOptions: {
      external: ['cesium'],
      plugins: [
        externalGlobals({
          "cesium": "Cesium"
        })
      ]
    }
  }
})
