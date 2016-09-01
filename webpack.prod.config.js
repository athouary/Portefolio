const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const configSite = require('./project.config.js');


const config = {
    context: path.join(__dirname, 'src'),
    entry: 'src/views/config',
    output: {
        filename: 'assets/[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel'],
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ["transform-runtime"]
                }
            },
            // For build
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.html.twig$/,
                loader: "file?name=[path][name].[ext]"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?&name=assets/img/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("assets/[name].css"),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
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
        "customImport": "Zepto"
    },
    postcss: function (webpack) {
        return [
            require('postcss-import')({
                path: './src/',
                addDependencyTo: webpack
            }),
            require("postcss-url")(),
            require('postcss-cssnext')(
                configSite.cssNextConfig
            ),
            require('postcss-neat')(
                configSite.neatConfig
            ),
            require('css-mqpacker')({
                sort: true
            })
        ];
    }
}

module.exports = config
