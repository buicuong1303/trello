import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from 'vite-plugin-svgr'
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
  plugins: [react(), svgr()]
})
