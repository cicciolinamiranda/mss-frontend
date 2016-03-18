var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'ng-annotate', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
    new CopyWebpackPlugin([
      { from: 'app/index.html' },
      { from: 'app.yaml' },
      { from: 'app/img', to: 'img' },
    ])
  ]
};
