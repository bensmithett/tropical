const path = require('path')
const shared = require('./shared')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, '../output'),
    liveReload: false,
    port: 9002
  },
  entry: path.join(__dirname, '../entrypoints/client.entry.js'),
  mode: 'development',
  module: {
    rules: [shared.rules.js, shared.rules.files]
  },
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: 'client.bundle.js'
  },
}
