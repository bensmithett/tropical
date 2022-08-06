import { widthPreset } from 'vite-plugin-image-presets'

export default {
  multiFormatExample: widthPreset({
    widths: [200, 500],
    formats: {
      webp: { quality: 50 },
      jpg: { quality: 70 }
    }
  }),

  singleFormatExample: widthPreset({
    widths: [200, 500],
    formats: {
      original: { quality: 80 }
    }
  })
}
