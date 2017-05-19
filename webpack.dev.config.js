const webpack = require('webpack')
const path = require('path')
const configSite = require('./config/project.config.js')

const configWebpackDev = {
    devtool: '#eval',
    context: path.resolve(__dirname, 'src'),
    entry: {
        common: ['jquery', 'scriptjs', './assets/styles/main.css', './views/shared/header/config'],
        main: ['./views/config', 'webpack/hot/dev-server', 'webpack-hot-middleware/client']
    },
    output: {
        filename: 'assets/scripts/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                loader: 'file-loader',
                options: {
                    name: './assets/images/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /images/,
                loader: 'file-loader',
                options: {
                    name: './assets/font/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('developpement')
        }),
        // needed for internal dependency, but need expose in config.js for external call
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 3,
            name: "common"
        })
    ],
    resolve: {
        alias: {
            template: path.resolve(__dirname, 'src/views'),
            vendor: path.resolve(__dirname, 'node_modules')
        },
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.js', '.css']
    },
    externals: {
        // import jquery is external and available
        //  on the global var jQuery
        customImport: "Zepto"
    }
}

module.exports = configWebpackDev
