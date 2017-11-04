import webpack from 'webpack'
import Config from 'webpack-config'
import path from 'path'
import pkg from '../package.json'

function camelize (str) {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();        
  })
}

export default new Config().merge({
  context: path.resolve(__dirname, '../src'),
  entry: {
    common: ['jquery', 'scriptjs', './views/shared/header/config']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    jsonpFunction: `${camelize(pkg.name)}`
  },
  resolve: {
    alias: {
      template: path.resolve(__dirname, '../src/views'),
      vendor: path.resolve(__dirname, '../node_modules')
    },
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.js', '.css']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      name: 'common'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      exclude: /(images|node_modules)/,
      loader: 'file-loader',
      options: {
        name: './assets/font/[name].[ext]'
      }
    }]
  }
});
