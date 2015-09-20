module.exports = {  
  entry: './Scripts/app.tsx',
  output: {
    filename: './wwwroot/js/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.ts(x)?$/, loader: 'ts-loader' }
    ]
  }
}