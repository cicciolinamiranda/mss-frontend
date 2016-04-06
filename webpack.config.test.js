var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {},
  output: {},
  module: {
    loaders: [
      {test: /\.js$/, loader: 'istanbul-instrumenter', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file', exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ]
};
