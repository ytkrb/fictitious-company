import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/fictitious-company/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
})
