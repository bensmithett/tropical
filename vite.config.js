import { defineConfig } from 'vite'
import path from 'path'
import { config } from './vite.config.server'

export default defineConfig({
  plugins: config.plugins,
  build: {
    ...config.build,
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'index.html'),
        // We'll never actually use this bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: path.resolve(__dirname, 'src/entry-server.jsx')
      }
    }
  }
})
