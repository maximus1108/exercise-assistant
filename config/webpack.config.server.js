const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');


const root = process.cwd();

// var nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

module.exports = {
  entry: path.resolve(root, 'src/server/server.js'),
  target: 'node',
  output: {
    path: path.join(root, 'build/server'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
}