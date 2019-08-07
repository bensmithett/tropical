const clientConfig = require('./webpack.config.client')
const prerenderConfig = require('./webpack.config.prerender')

module.exports = [clientConfig, prerenderConfig]
