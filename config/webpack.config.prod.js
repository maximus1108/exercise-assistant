const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PreloadCssPlugin = require("preload-css-webpack-plugin");
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin')

//get root.
const root = process.cwd();

const externalCSS = new ExtractTextPlugin('assets/css/style.[hash].css');
const criticalCSS = new ExtractTextPlugin('critical.css');

module.exports = merge(common, {
    entry: [
        "./src/client/index.js"
    ],    
    output: {
        //Set location for where bundled js should be served
        hashDigestLength: 6,
        path: path.resolve(root, "build/client"),
        filename: "assets/js/main.[hash].js"
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
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [{
                    loader: "file-loader",
                    options:{
                        name: 'assets/media/img/name.[hash:6].[ext]'
                    }
                }]
            },
            {
                test: [/\.mp4$/, /\.ogg$/],
                use: [{
                    loader: "file-loader",
                    options:{
                        name: 'assets/media/vid/name.[hash:6].[ext]'
                    }
                }]
            }
            
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin('build', {
            root: root
        }),        
        new webpack.DefinePlugin({
            '__SERVER__': '""'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(root, 'public/index.html'),
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
        new PreloadCssPlugin({
            blacklist: [/critical\.css/],
            noscript: true,
            linkEventHandlers: {
                onload: "this.onload=null;this.rel='stylesheet'"
            }
        }),
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