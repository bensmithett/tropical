const path = require('path')
const rimraf = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const rehypeSlug = require('rehype-slug')

/*
Webpack module rules shared between client & prerender configs
****************************************************************/
const shared = {
  rules: {
    js: {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    files: {
      test: /\.(png|jpe?g|gif|svg|woff2?|mp3|mp4|webm|webp)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[contenthash].[ext]'
      }
    },
    mdx: {
      test: /\.mdx$/,
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            rehypePlugins: [rehypeSlug]
          }
        }
      ]
    }
  },
  output: {
    path: path.resolve(__dirname, './output'),
    publicPath: '/'
  }
}

/*
Client JS bundle Webpack config
*********************************************/
const clientConfig = (mode) => {
  return {
    entry: {
      client: path.join(__dirname, './entrypoints/client.js'),
    },
    mode,
    module: {
      rules: [shared.rules.js, shared.rules.files]
    },
    output: {
      ...shared.output,
      filename: mode === 'production' ? '[name].bundle.[contenthash].js' : '[name].bundle.js'
    },
    plugins: [
      new ManifestPlugin({
        fileName: 'manifest.client.json'
      })
    ]
  }
}

/*
Prerender JS bundle Webpack config
*********************************************/
const prerenderConfig = () => {
  return {
    entry: {
      prerender: path.join(__dirname, './entrypoints/prerender.js')
    },
    target: 'node',
    node: {
      // Allow the webpacked prerender module to access these Node globals in the context of its source's location
      __dirname: true
    },
    mode: 'none',
    module: {
      rules: [shared.rules.js, shared.rules.files, shared.rules.mdx]
    },
    output: {
      ...shared.output,
      filename: '[name].bundle.js',
      libraryExport: 'default',
      libraryTarget: 'commonjs2',
      library: 'prerender'
    },
    plugins: [
      new ManifestPlugin({
        fileName: 'manifest.prerender.json'
      })
    ]
  }
}

/*
Build webpack bundles & run the prerenderer.

- 🔥 whatever is currently in `output`
- Build both Webpack configs into `output`
- Call the default export of the prerender bundle
- Watch for changes, rinse & repeat

That's all. You won't even find a dev server in here!
**********************************************************/
rimraf(path.resolve(__dirname, './output/*'), (err) => {
  if (err) {
    console.error(chalk.red(error))
    process.exit()
  }

  const mode = process.argv[2]
  const compiler = webpack([
    clientConfig(mode),
    prerenderConfig()
  ])

  const watching = compiler.watch({}, (err, compilation) => {
    let hasErrors = !!err

    const statsArray = compilation.stats

    statsArray.forEach((stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length) hasErrors = true
      console.log(stats.toString({ colors: true }))
    })

    if (!hasErrors) {
      console.log(chalk.cyan('🏝  Loading asset manifest...'))
      const manifest = {
        ...require('./output/manifest.prerender.json'),
        ...require('./output/manifest.client.json')
      }
      delete manifest['prerender.js']

      const prerenderModulePath = path.resolve(__dirname, './output/prerender.bundle.js')
      console.log(chalk.cyan('🏝  Clearing commonjs require cache...'))
      delete require.cache[require.resolve(prerenderModulePath)]
      console.log(chalk.cyan('🏝  Loading webpacked prerender module...'))
      const prerender = require(prerenderModulePath)
      console.log(chalk.cyan('🏝  Prerendering...'))

      try {
        prerender(manifest, mode)
      } catch (err) {
        console.error(chalk.red('🏝  Error in prerender function...'))
        console.error(chalk.red(err))
      }
    }

    if (mode === 'production') {
      console.log(chalk.cyan('🏝  Deleting files only required for prerendering...'))
      rimraf(path.resolve(__dirname, './output/+(prerender.bundle.js|manifest.*.json)'), (err) => {
        if (err) {
          console.error(chalk.red(error))
          process.exit()
        }
        watching.close()
      })
    }
  })
})
