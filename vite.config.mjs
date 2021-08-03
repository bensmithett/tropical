import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { config } from './vite.config.server.mjs'

export default defineConfig({
  plugins: config.plugins,
  build: {
    ...config.build,
    rollupOptions: {
      input: {
        client: fileURLToPath(new URL('index.html', import.meta.url)),
        // We'll never actually use this bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: fileURLToPath(new URL('src/entry-server.jsx', import.meta.url))
      }
    }
  }
})
