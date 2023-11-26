import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    // replace ~ = /src
    alias: [
      {
        find: '~',
        replacement: '/src'
      }
    ]
  },
  plugins: [react(), visualizer()]
})
