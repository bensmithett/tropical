import { widthPreset } from 'vite-plugin-image-presets'

// Presets for https://github.com/ElMassimo/vite-plugin-image-presets
// See https://tropical.js.org/docs/images
// and stories for tropical/Image & tropical/Picture for usage examples.

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
