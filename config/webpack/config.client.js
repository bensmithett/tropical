const webpack = require('webpack')
const path = require('path')
const shared = require('./shared_webpack_config')
const prerenderConfig = require('./config.prerender')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  return {
    devServer: {
      contentBase: [
        path.join(__dirname, '../../output')
      ],
      liveReload: false,
      port: 9002
    },
    entry: {
      client: path.join(__dirname, '../../entrypoints/client.entry.js')
    },
    module: {
      rules: [shared.rules.js, shared.rules.files]
    },
    output: {
      path: path.resolve(__dirname, '../../output'),
      filename: argv.mode === 'production' ? 'client.bundle.[contenthash].js' : 'client.bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new BuildPrerenderBundlePlugin(env, argv)
    ]
  }
}

class BuildPrerenderBundlePlugin {
  constructor (env, argv) {
    this.env = env
    this.argv = argv
  }

  apply (compiler) {
    compiler.hooks.emit.tap('BuildPrerenderBundlePlugin', (compilation, callback) => {
      webpack(prerenderConfig(this.env, this.argv), (err, stats) => {
        if (err) {
          console.error('BuildPrerenderBundlePlugin: Error building prerender bundle.')
          console.error(err)
        }

        if (stats) {
          console.log('BuildPrerenderBundlePlugin: Prerender plugin built.')
          console.log(stats.toString({
            chunks: false,
            colors: true
          }))
        }
      })
    })
  }
}
