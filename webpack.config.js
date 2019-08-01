const path = require('path')
const exec = require('child_process').exec

const sharedRules = {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
  ]
}

const clientConfig = {
  entry: './client_js/client_entry.js',
  mode: 'development',
  module: sharedRules,
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'client_bundle.js'
  },
}

const buildScriptConfig = {
  entry: './static_site_generation/build.js',
  target: 'node',
  mode: 'development',
  module: sharedRules,
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'build_script_bundle.js'
  },
  plugins: [{apply: postBuild}]
}

module.exports = [buildScriptConfig, clientConfig]

function postBuild (compiler) {
  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
    exec('node ./output/build_script_bundle.js', (err, stdout, stderr) => {
      if (err) process.stderr.write(err)
      if (stderr) process.stderr.write(stderr)
      if (stdout) process.stdout.write(stdout)
    })
  })
}
