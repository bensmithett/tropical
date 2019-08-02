module.exports = {
  rules: {
    js: {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    files: {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file-loader'
    }
  }
}
