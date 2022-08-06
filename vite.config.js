import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import imagePresetsPlugin from 'vite-plugin-image-presets'
import imagePresetsConfig from './src/imagePresets'

export const plugins = [
  react(),
  mdx({ rehypePlugins: [rehypeSlug], providerImportSource: '@mdx-js/react' }),
  imagePresetsPlugin(imagePresetsConfig)
]

export const build = {
  assetsInlineLimit: 0
}

export default defineConfig({ plugins, build })
