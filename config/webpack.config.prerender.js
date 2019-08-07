const path = require('path')
const shared = require('./shared')
const exec = require('child_process').exec

module.exports = {
  entry: path.join(__dirname, '../entrypoints/prerender.entry.js'),
  target: 'node',
  node: {
    __dirname: false
  },
  module: {
    rules: [shared.rules.js, shared.rules.files]
  },
  output: {
    path: path.resolve(__dirname, '../output/webpack'),
    filename: 'prerender.bundle.js'
  },
  plugins: [{ apply: postBuild }]
}

function postBuild (compiler) {
  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
    const outputBundle = path.resolve(__dirname, '../output/webpack/prerender.bundle.js')
    exec(`node ${outputBundle}`, (err, stdout, stderr) => {
      if (err || stderr) console.error(err || stderr)
      if (stdout) console.log(stdout)
    })
  })
}
