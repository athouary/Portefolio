import Config from 'webpack-config'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BabelMinifyPlugin from 'babel-minify-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: {
    main: ['./config']
  },
  output: {
    filename: 'scripts/[name]-[hash].js',
    chunkFilename: 'scripts/[name]-[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
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
      test: /\.(jpe?g|png|gif|svg)$/i,
      exclude: /fonts/,
      use: [{
        loader: 'file-loader',
        options: {
          name: './images/[name]-[hash].[ext]'
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
      filename: 'styles/[name]-[contenthash].css'
    }),
    new BabelMinifyPlugin({
      // TODO: Check if needed
      // here you can configure Babili options
      // https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options
    }, {
      // Here you can overide some config :
      // https://github.com/webpack-contrib/babili-webpack-plugin#overrides
    }),
    // TODO: Check if needed
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Auxane Thouary - Développeur front-end',
      filename: '../views/index.hbs',
      template: './layout.hbs'
    })
  ],
  performance: {
    hints: 'error'
  }
})
