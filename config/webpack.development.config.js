import Config from 'webpack-config'
import webpack from 'webpack'

export default new Config().extend('config/webpack.base.config.js').merge({
  devtool: '#eval',
  output: {
    filename: 'assets/scripts/[name].js'
  },
  entry: {
    main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true', './views/config']
  },
  module: {
    rules: [{
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
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  performance: {
    hints: 'warning'
  }
})
