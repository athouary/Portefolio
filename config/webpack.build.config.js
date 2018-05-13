import Config from 'webpack-config'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BabelMinifyPlugin from 'babel-minify-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: {
    main: ['./config']
  },
  output: {
    filename: 'assets/scripts/[name]-[hash].js',
    chunkFilename: 'assets/scripts/[name]-[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true || { /* CSSNano Options */ }
          }
        },
        {
          loader: 'postcss-loader'
        }]
      })
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      exclude: /(fonts|node_modules)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      }]
    },
    {
      test: /\.(pdf)$/i,
      exclude: /(fonts|node_modules)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/files/[name].[ext]'
        }
      }]
    },
    {
      test: /layout.hbs$/,
      loader: 'handlebars-loader'
    }]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/styles/[name]-[contenthash].css'
    }),
    new BabelMinifyPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Auxane Thouary - Développeur front-end',
      filename: '../views/index.hbs',
      template: './layout.hbs'
    })
  ],
  performance: {
    hints: 'warning'
  }
})
