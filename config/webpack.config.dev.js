var path = require('path');
var webpack = require("webpack");
var merge = require('webpack-merge');
var common = require('./webpack.config.common.js');

//get root.
var root = process.cwd();

module.exports = merge(common, {
    entry: [
      //append webpack-dev-server and hot module replacement to entry point
      //to allow for auto reloading when any dependancy is updated.
      "webpack-dev-server/client?http://localhost:8080/",
      "webpack/hot/dev-server",

      //entry point for app
      "./src/client/index.js"
    ],    
    output: {
        //Set location for where bundled js should be served
        path: path.resolve(root, "public"),
        filename: "main.js"
    },
    //loaders
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: [
                    path.resolve(root, 'node_modules')
                ],
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    mode: "development",
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
});