var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'ng-annotate', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file', exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ]
};
