module.exports = {
  entry: './Scripts/index.jsx',
  output: {
    filename: './wwwroot/js/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jsx']
  },
  resolveLoader: { root: __dirname + "/node_modules"},
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader' }
    ]
  }
}