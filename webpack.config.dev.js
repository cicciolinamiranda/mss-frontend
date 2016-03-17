var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
  }
};
