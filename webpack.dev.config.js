'use strict';

const webpack = require('webpack');
const path = require('path');

const configSite = require('./project.config.js');

const config = {
    devtool: '#eval',
    context: path.join(__dirname, 'src'),
    entry: {
        // adsHelper: ['./views/blocks/ads/config'], 
        main: ['src/views/config', 'webpack/hot/dev-server', 'webpack-hot-middleware/client']
    },
    output: {
        filename: 'assets/scripts/[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: 'http://localhost:3000/'
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
                loader: 'style!css?sourceMap&importLoaders=1!postcss'
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
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /images/,
                loader: 'file?&name=./assets/font/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // needed for internal dependency, but need expose in config.js for external call
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            template: 'src/views',
            vendor: 'node_modules'
        },
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.css']
    },
    externals: {
        // import jquery is external and available
        //  on the global var jQuery
        customImport: "Zepto"
    },
    postcss: function (webpack) {
        return [
            require('postcss-import')({
                path: path.join(__dirname, 'src/assets/styles'), // Du to some bug with resolve of relative/absolute path we need to define it here ATM
                addDependencyTo: webpack
            }),
            require("postcss-mixins")({
                mixins: configSite.mixins
            }),
            require('postcss-url')(),
            require('postcss-cssnext')(
                configSite.cssNextConfig()
            ),
            require('css-mqpacker')({
                sort: true
            }),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')()
        ];
    }
}

module.exports = config
