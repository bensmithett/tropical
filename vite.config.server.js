import { defineConfig } from 'vite'
import mdx from 'vite-plugin-mdx'

// Separate config for the server bundle because there's an error when supplying the
// --ssr flag with multiple entrypoints in build.rollupOptions.input
export default defineConfig({
  plugins: [mdx()],
  build: {
    assetsInlineLimit: 0
  }
})
