import webpack from 'webpack'
import path from 'path'
import pkg from './package.json'

function camelize (str) {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();        
  })
}

const configWebpackDev = {
  devtool: '#eval',
  context: path.resolve(__dirname, 'src'),
  entry: {
    common: ['jquery', 'scriptjs', './assets/styles/main.css', './views/shared/header/config'],
    main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true', './views/config']
  },
  output: {
    filename: 'assets/scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    jsonpFunction: `${camelize(pkg.name)}`
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
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
      exclude: /(fonts|node_modules)/,
      loader: 'file-loader',
      options: {
        name: './assets/images/[name].[ext]'
      }
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      exclude: /(images|node_modules)/,
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
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('developpement')
    // }),
    // needed for internal dependency, but need expose in config.js for external call
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      name: 'common'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
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
    customImport: 'Zepto'
  }
}

export default configWebpackDev
