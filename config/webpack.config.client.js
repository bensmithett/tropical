const path = require('path')
const shared = require('./shared')

module.exports = {
  devServer: {
    contentBase: [
      path.join(__dirname, '../output/webpack'),
      path.join(__dirname, '../output/prerender')
    ],
    liveReload: false,
    port: 9002,
    writeToDisk: (filePath) => {
      return /prerender\.bundle\.js$/.test(filePath);
    }
  },
  entry: path.join(__dirname, '../entrypoints/client.entry.js'),
  module: {
    rules: [shared.rules.js, shared.rules.files]
  },
  output: {
    path: path.resolve(__dirname, '../output/webpack'),
    filename: 'client.bundle.js'
  }
}
