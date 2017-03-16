'use strict';

const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');

const configSite = require('./config/project.config.js');


const config = {
    context: path.join(__dirname, 'src'),
    entry: {
        common: ['jquery', 'scriptjs', './assets/styles/main.css', 'src/views/shared/header/config'],
        main: ['src/views/config']
    },
    output: {
        filename: 'assets/scripts/[name].js?[chunkhash]',
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
                    presets: ['latest', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!!postcss')
            },
            {
                test: /\.html.twig$/,
                loader: 'file?name=[path][name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                loaders: [
                    'file?&name=./assets/images/[name].[ext]?[hash]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /images/,
                loader: 'file?&name=assets/fonts/[name].[ext]?[hash]'
            }
        ]
    },
    plugins: [
        new WebpackMd5Hash(),
        new ManifestPlugin({
            fileName: 'assets/manifest.json'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('assets/styles/[name].css?[contenthash]', {
            allChunks:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 3,
            name: "common"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: path.join(__dirname, 'src/views/layout.html.twig'),
            template: path.join(__dirname, 'src/views/layout.html.tpl.twig')
        })
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
        // Need to add base styles to be able to require main.css in entry
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.css', '.twig']
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        customImport: "Zepto"
    },
    postcss: function (webpack) {
        return [
            require('postcss-import')({
                path: path.join(__dirname, 'src/assets/styles')
            }),
            require('postcss-mixins')({
                mixins: configSite.mixins
            }),
            require('postcss-url')(),
            require('css-mqpacker')({
                sort: true
            }),
            require('postcss-cssnext')(
                configSite.cssNextConfig()
            )
        ];
    }
}

module.exports = config
