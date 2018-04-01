var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.config.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//get root.
var root = process.cwd();

module.exports = merge(common, {
    entry: [
        "./src/client/index.js"
    ],    
    output: {
        //Set location for where bundled js should be served
        path: path.resolve(root, "build"),
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ {
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader",
                    }]
                })
            }
        ]
    },
    mode: 'production',
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
});