import Config from 'webpack-config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BabelMinifyPlugin from 'babel-minify-webpack-plugin'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'

export default new Config().extend(
  'config/webpack.base.config.js').merge({
  entry: {
    main: ['./views/config']
  },
  output: {
    chunkFilename: 'assets/scripts/[name]-[chunkhash].js'
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
          name: './assets/images/[name]-[hash].[ext]'
        }
      },
      {
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            progressive: true
          },
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 4
          },
          pngquant: {
            quality: '75-90',
            speed: 3
          }
        }
      }]
    }]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   hash: true,
    //   filename: './views/layout.html.twig',
    //   template: './views/layout.html.tpl.twig'
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/styles/[name]-[contenthash].css',
      allChunks: true
    }),
    new BabelMinifyPlugin({
      // here you can configure Babili options
      // https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options
    }, {
      // Here you can overide some config :
      // https://github.com/webpack-contrib/babili-webpack-plugin#overrides
    }),
    new ManifestPlugin()
  ],
  performance: {
    hints: 'error'
  }
})
