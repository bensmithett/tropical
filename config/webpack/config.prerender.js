// AIMS
// - prerender config can be called standalone
// - production & development builds
// - Prod passes filename (and integrity sha?) to prerender script
// - webpack-dev-server runs both in development & handles errors in either
// - Env-aware. Code in both bundles can branch based on environment.
// - STRETCH GOAL: Pass webpacked asset manifest to prerender?

const path = require('path')
const shared = require('./shared_webpack_config')
const evaluatePrerenderBundle = require('./evaluate_prerender_bundle')

const BUNDLE_FILENAME = 'prerender.bundle.js'

module.exports = (env, {mode}) => {

  return {
    entry: {
      prerender: path.join(__dirname, '../../entrypoints/prerender.entry.js')
    },
    target: 'node',
    node: {
      // Allow the webpacked prerender module to access these Node globals in the context of its source's location
      __dirname: true
    },
    mode,
    module: {
      rules: [shared.rules.js, shared.rules.files]
    },
    output: {
      path: path.resolve(__dirname, '../../output'),
      filename: BUNDLE_FILENAME,

      // Allows RunPrerenderBundlePlugin to access the default export of eval'd renderer bundle source
      library: 'SAN_BLAS_PRERENDER_BUNDLE',
      libraryTarget: 'commonjs'
    },
    plugins: [
      new RunPrerenderBundlePlugin(mode)
    ],
    watch: true
  }
}

class RunPrerenderBundlePlugin {
  constructor (mode) { this.mode = mode }

  apply (compiler) {
    compiler.hooks.emit.tap('RunPrerenderBundlePlugin', (compilation) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((filename) => {
          if (filename = BUNDLE_FILENAME) {
            try {
              const source = compilation.assets[filename].source()
              console.log('RunPrerenderBundlePlugin: Evaluating & running prerender bundle...')
              evaluatePrerenderBundle(source, this.mode)
              delete compilation.assets[filename]
              console.log('RunPrerenderBundlePlugin: Prerender complete.')
            } catch (err) {
              console.error('RunPrerenderBundlePlugin: Error evaluating webpacked prerender bundle.')
              console.error(err)
            }
          }
        })
      })
    })
  }
}
