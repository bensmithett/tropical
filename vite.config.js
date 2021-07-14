import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx from 'vite-plugin-mdx'
import path from 'path'

export default defineConfig({
  plugins: [reactRefresh(), mdx()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'index.html'),
        // We'll never actually use this bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: path.resolve(__dirname, 'src/entry-server.jsx')
      }
    }
  }
})
