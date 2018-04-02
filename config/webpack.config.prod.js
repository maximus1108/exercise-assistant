var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.config.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var autoprefixer = require('autoprefixer');

//get root.
var root = process.cwd();

var externalCSS = new ExtractTextPlugin('assets/css/style.css');
var criticalCSS = new ExtractTextPlugin('critical.css');

module.exports = merge(common, {
    entry: [
        "./src/client/index.js"
    ],    
    output: {
        //Set location for where bundled js should be served
        path: path.resolve(root, "build"),
        filename: "assets/js/main.js"
    },
    //loaders
    module: {
        rules: [
            {
                test: /^(?!.*critical\.s?css).*\.s?css$/,
                exclude: [
                    path.resolve(root, 'node_modules')
                ],
                use: externalCSS.extract({
                    fallback: "style-loader",
                    use: [ {
                        loader: "css-loader",
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer
                            ]
                        }
                    }, {
                        loader: "sass-loader",
                    }]
                })
            },
            {
                test: /\.?critical\.s?css$/,
                exclude: [
                    path.resolve(root, 'node_modules')
                ],
                use: criticalCSS.extract({
                    fallback: "style-loader",
                    use: [ {
                        loader: "css-loader",
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer
                            ]
                        }
                    }, {
                        loader: "sass-loader"
                    }]
                })          
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(root, 'public/index.html'),
            hash: true,
            excludeAssets: [/\.s?css/],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),        
        externalCSS,
        criticalCSS,
        new StyleExtHtmlWebpackPlugin('critical.css'),
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    ]
});