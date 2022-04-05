import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  plugins: [react(), mdx({ rehypePlugins: [rehypeSlug] })],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
})
