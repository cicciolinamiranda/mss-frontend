var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file', exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
    new CopyWebpackPlugin([
      { from: 'app.yaml' },
      { from: 'app/static', to: 'static' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      hash: true
    })
  ]
};
