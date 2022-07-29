import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config.js'

export default defineConfig({
  plugins: sharedConfig.plugins,
  build: {
    ...sharedConfig.build,
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
})
