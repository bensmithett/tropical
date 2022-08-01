import { defineConfig } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { plugins, build } from './vite.config.js'

const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins,
  build: {
    ...build,
    rollupOptions: {
      input: {
        client: resolve(dir, 'index.html'),
        // We'll never actually use this JS bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: resolve(dir, 'src/entry-server.jsx')
      }
    }
  }
})
