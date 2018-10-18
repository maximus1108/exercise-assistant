var path = require('path');
var webpack = require("webpack");
var merge = require('webpack-merge');
var common = require('./webpack.config.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var autoprefixer = require('autoprefixer');

//get root.
var root = process.cwd();

module.exports = merge(common, {
    entry: [
      //append webpack-dev-server and hot module replacement to entry point
      //to allow for auto reloading when any dependancy is updated.
      "webpack-dev-server/client?http://localhost:3001/",
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
                use: [{
                    loader: "style-loader"  
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            autoprefixer
                        ],
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: ["./node_modules/bootstrap/scss"]
                    }
                }]
            }, {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [{
                    loader: "file-loader"
                }]
            },{
                test: [/\.mp4$/, /\.ogg$/],
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            '__SERVER__': '"http://localhost:3000"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(root, 'public/index.html'),
            excludeAssets: [/\.s?css/]
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }) 
    ]
});