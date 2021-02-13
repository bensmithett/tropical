/*
This is a pretty long file, but fear not!

As complexity grows you may split this up into separate modules,
but right now we can just read this file from top to bottom &
understand our entire build process and Webpack configuration.
****************************************************************/

const path = require('path')
const rimraf = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const rehypeSlugPlugin = require('rehype-slug')
const packageJSON = require('../package.json')

/*
Webpack options shared across our 2 configs (client and prerender)
****************************************************************/
const shared = {
  rules: {
    // Use Babel to transform JS files as per our babel.config.js
    js: {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },

    // Transform static file imports into URL strings
    staticFiles: (mode) => ({
      test: /\.(png|jpe?g|gif|svg|woff2?|mp3|mp4|webm|webp)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[contenthash].[ext]',
        publicPath: `${mode === 'production' ? packageJSON.tropical.siteURL : ''}/`
      }
    }),

    // Transform MDX files into React components.
    mdx: {
      test: /\.mdx$/,
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            // The rehype-slug plugin adds id's to h1-h6 elements so you can link to them.
            rehypePlugins: [ rehypeSlugPlugin ]
          }
        }
      ]
    }
  },

  output: {
    path: path.resolve(__dirname, '../output'),
    publicPath: '/'
  }
}

/*
Client JS bundle Webpack config
*********************************************/
const clientConfig = mode => {
  return {
    entry: {
      client: path.join(__dirname, './client.js')
    },
    mode,
    module: {
      rules: [
        shared.rules.js,
        shared.rules.staticFiles(mode),
        shared.rules.mdx
      ]
    },
    output: {
      ...shared.output,
      filename: mode === 'production' ? '[name].bundle.[contenthash].js' : '[name].bundle.js'
    },
    plugins: [
      new WebpackManifestPlugin({
        fileName: 'manifest.client.json'
      })
    ]
  }
}

/*
Prerender JS bundle Webpack config
*********************************************/
const prerenderConfig = (mode) => {
  return {
    entry: {
      prerender: path.join(__dirname, './prerender.js')
    },
    target: 'node',
    node: {
      // Allow the webpacked prerender module to access the Node global
      // __dirname in the context of its source's location
      __dirname: true
    },
    mode: 'none',
    module: {
      rules: [
        shared.rules.js,
        shared.rules.staticFiles(mode),
        shared.rules.mdx
      ]
    },
    output: {
      ...shared.output,
      filename: '[name].bundle.js',
      libraryExport: 'default',
      libraryTarget: 'commonjs2',
      library: 'prerender'
    },
    plugins: [
      new WebpackManifestPlugin({
        fileName: 'manifest.prerender.json'
      })
    ]
  }
}

/*
Now we can build our 2 bundles (client & prerender) & run our prerender function
to generate our static site!

1. Delete everything currently in the `output` folder
2. Build both bundles into `output`
3. Call the default export of the prerender bundle
4. Watch for changes, repeat step 2.

That's all!
**********************************************************/
rimraf(path.resolve(__dirname, '../output/*'), err => {
  if (err) {
    console.error(chalk.red(error))
    process.exit()
  }

  // Our package scripts pass either 'development' or 'production' for use as Webpack's 'mode'
  const mode = process.argv[2]
  
  // Compile our bundles with Webpack
  const compiler = webpack([clientConfig(mode), prerenderConfig(mode)])

  // Watch for changes and define what should happen after every Webpack compilation.
  const watching = compiler.watch({}, (err, compilation) => {
    let hasErrors = !!err

    // Log the results of the Webpack compilation
    const statsArray = compilation.stats
    statsArray.forEach(stats => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        hasErrors = true
      }
      console.log(stats.toString({ colors: true }))
    })

    if (!hasErrors) {
      // The asset manifest lists the generated caching-friendly filenames 
      // so we can refer to them without knowing the final name (e.g. client.bundle.some-random-hash.js)
      console.log(chalk.cyan('🏝  Loading asset manifest...'))
      const manifest = {
        ...require('../output/manifest.prerender.json'),
        ...require('../output/manifest.client.json')
      }
      delete manifest['prerender.js']

      // Import the prerender module and call its default exported function
      const prerenderModulePath = path.resolve(
        __dirname,
        '../output/prerender.bundle.js'
      )
      console.log(chalk.cyan('🏝  Clearing commonjs require cache...'))
      delete require.cache[require.resolve(prerenderModulePath)]
      console.log(chalk.cyan('🏝  Loading webpacked prerender module...'))
      const prerender = require(prerenderModulePath)
      console.log(chalk.cyan('🏝  Prerendering...'))

      try {
        prerender(manifest, mode)
      } catch (err) {
        console.error(chalk.red('🏝  Error in prerender function...'))
        console.error(chalk.red(err.stack))
      }
    }

    if (mode === 'production') {
      console.log(
        chalk.cyan('🏝  Deleting files only required for prerendering...')
      )
      rimraf(
        path.resolve(
          __dirname,
          '../output/+(prerender.bundle.js|manifest.*.json)'
        ),
        err => {
          if (err) {
            console.error(chalk.red(error))
            process.exit()
          }
          watching.close()
        }
      )
    }
  })
})
