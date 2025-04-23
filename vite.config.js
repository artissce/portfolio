import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ghPages } from 'vite-plugin-gh-pages'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), ghPages()],
  base: 'portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
