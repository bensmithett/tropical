const path = require('path')
const shared = require('./shared')
const exec = require('child_process').exec

module.exports = {
  entry: path.join(__dirname, '../entrypoints/build_script.entry.js'),
  target: 'node',
  module: {
    rules: [shared.rules.js, shared.rules.files]
  },
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: 'build_script.bundle.js'
  },
  plugins: [{ apply: postBuild }]
}

function postBuild (compiler) {
  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
    const outputBundle = path.resolve(__dirname, '../output/build_script.bundle.js')
    exec(`node ${outputBundle}`, (err, stdout, stderr) => {
      if (err || stderr) console.error(err || stderr)
      if (stdout) console.log(stdout)
    })
  })
}

// TODO
// Plugin to generate HTML files as part of build so we can use clean plugin & stay in webpack universe
// https://webpack.js.org/contribute/plugin-patterns/#exploring-assets-chunks-modules-and-dependencies
