import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import BabiliPlugin from 'babili-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import configSite from './config/project.config.js'

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    common: ['jquery', 'scriptjs', './assets/styles/main.css', './views/shared/header/config'],
    main: ['./views/config']
  },
  output: {
    filename: 'assets/scripts/[name].js?[chunkhash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /fonts/,
        use: [{
            loader: 'file-loader',
            options: {
              name: './assets/images/[name].[ext]?[hash]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        exclude: /images/,
        loader: 'file-loader',
        options: {
          name: './assets/fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      filename: path.join(__dirname, 'src/views/layout.html.twig'),
      template: path.join(__dirname, 'src/views/layout.html.tpl.twig')
    }),
    new ExtractTextPlugin({
      filename: 'assets/styles/[name].css?[contenthash]',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      name: "common"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new BabiliPlugin({
      // here you can configure Babili options
      // https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options
    }, {
      // Here you can overide some config : 
      // https://github.com/webpack-contrib/babili-webpack-plugin#overrides
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
    // require("jquery") is external and available
    //  on the global var jQuery
    customImport: "Zepto"
  }
}

export default config
