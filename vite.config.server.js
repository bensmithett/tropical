import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from 'vite-plugin-mdx'
import rehypeSlug from 'rehype-slug'

export const config = {
  plugins: [react(), mdx({ rehypePlugins: [rehypeSlug] })],
  build: {
    assetsInlineLimit: 0
  }
}

// Separate server config for --ssr because there's an error when supplying the
// --ssr flag if config contains multiple entrypoints in build.rollupOptions.input
// (like our main config does)
export default defineConfig(config)
