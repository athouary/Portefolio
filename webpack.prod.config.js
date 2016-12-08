'use strict';

const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const configSite = require('./project.config.js');


const config = {
    context: path.join(__dirname, 'src'),
    entry: {
        // scriptjs: ['scriptjs'],
        main: ['src/views/config']
    },
    output: {
        filename: 'assets/scripts/[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.html.twig$/,
                loader: 'file?name=[path][name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                loaders: [
                    'file?&name=./assets/images/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /images/,
                loader: 'file?&name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('assets/styles/[name].css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: path.join(__dirname, 'src/views/layout.html.twig'),
            template: path.join(__dirname, 'src/views/layout.html.tpl.twig')
        }),
        // Uncomment to minify JS and CSS
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            template: 'src/views',
            vendor: 'node_modules'
        },
        modulesDirectories: ['node_modules', './src'],
        extensions: ['', '.js', '.css', '.twig']
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        'customImport': "Zepto"
    },
    postcss: function (webpack) {
        return [
            require('postcss-import')({
                path: path.join(__dirname, 'src/assets/styles')
            }),
            require("postcss-mixins")({
                mixins: configSite.mixins
            }),
            require("postcss-url")(),
            require('postcss-cssnext')(
                configSite.cssNextConfig
            ),
            require('css-mqpacker')({
                sort: true
            })
        ];
    }
}

module.exports = config
