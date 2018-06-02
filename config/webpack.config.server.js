const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const root = process.cwd();

module.exports = {
  entry: path.resolve(root, 'src/server/server.js'),
  target: 'node',
  output: {
    path: path.join(root, 'build/server'),
    filename: 'server.js'
  },
  module: {
    rules: [
        {
            test: /\.js?$/,
            use: [{
                loader: 'babel-loader'
            }]
        }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
          comments: false
      }
    })
  ]
}