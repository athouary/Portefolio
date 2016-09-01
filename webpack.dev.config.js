const webpack = require('webpack');
const path = require('path');

const configSite = require('./project.config.js');

const config = {
    devtool: '#inline-source-map',
    context: path.join(__dirname, 'src'),
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'src/views/config'
    ],
    output: {
        filename: 'assets/[name].js',
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
                loader: "file?name=[path][name].[ext]"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?&name=./assets/img/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file"
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
            require('postcss-url')(),
            require('postcss-cssnext')(
                configSite.cssNextConfig
            ),
            require('postcss-neat')(
                configSite.neatConfig
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
