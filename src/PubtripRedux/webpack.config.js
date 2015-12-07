module.exports = {
  entry: './Scripts/index.jsx',
  output: {
    filename: './wwwroot/js/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: { 'moment-timezone': 'moment-timezone/builds/moment-timezone-with-data-2010-2020.js'},
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.jsx']
  },
  resolveLoader: { root: __dirname + "/node_modules"},
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', query: { compact: false } }
    ]
  }
}