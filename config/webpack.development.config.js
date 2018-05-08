import Config from 'webpack-config'
import webpack from 'webpack'

export default new Config().extend('config/webpack.base.config.js').merge({
  devtool: '#eval',
  entry: {
    main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?reload=true', './config']
  },
  output: {
    filename: 'assets/scripts/[name].js',
    chunkFilename: 'assets/scripts/[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      // exclude: /(node_modules)/,
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
      test: /\.(jpe?g|png|gif)$/i,
      exclude: /(fonts|node_modules)/,
      loader: 'file-loader',
      options: {
        name: './assets/images/[name].[ext]'
      }
    },
    {
      test: /\.(pdf)$/i,
      exclude: /(fonts|node_modules)/,
      loader: 'file-loader',
      options: {
        name: './assets/files/[name].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
