import { defineConfig } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'

const dir = dirname(fileURLToPath(import.meta.url))

export const sharedConfig = {
  plugins: [
    react(),
    mdx({ rehypePlugins: [rehypeSlug], providerImportSource: '@mdx-js/react' }),
    imagePresets({
      example: widthPreset({
        widths: [200, 500],
        formats: {
          avif: { quality: 80 },
          jpg: { quality: 50 }
        }
      })
    })
  ],
  build: {
    assetsInlineLimit: 0
  }
}

export default defineConfig({
  plugins: sharedConfig.plugins,
  build: {
    ...sharedConfig.build,
    rollupOptions: {
      input: {
        client: resolve(dir, 'index.html'),
        // We'll never actually use this JS bundle, but need it to build assets that are only referenced by SSR pages
        ssrAssetCollector: resolve(dir, 'src/entry-server.jsx')
      }
    }
  }
})
