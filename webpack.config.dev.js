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
      {test: /\.js$/, loaders: 'ng-annotate', exclude: /node_modules/},
      {test: /\.html$/, loaders: 'raw', exclude: /node_modules/},
      {test: /\.css$/, loaders: 'style!css', exclude: /node_modules/}
    ]
  }
};
