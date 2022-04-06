import { defineConfig } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'

const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), mdx({ rehypePlugins: [rehypeSlug], providerImportSource: '@mdx-js/react' })],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        client: resolve(dir, 'index.html'),
        // We'll never actually use this bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: resolve(dir, 'src/entry-server.jsx')
      }
    }
  }
})
