import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'

export const config = {
  plugins: [react(), mdx({ rehypePlugins: [rehypeSlug], providerImportSource: '@mdx-js/react' })],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
}

export default defineConfig(config)
