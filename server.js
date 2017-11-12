import chalk from 'chalk'
import http from 'http'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import browserSync from 'browser-sync'

import webpackConfig from './webpack.config'
import app from './config/app'
import configVars from './config/project.config.js'

const bundler = webpack(webpackConfig)
const server = http.createServer(app)
const port = app.get('port')

// Listen on port 9000 for Express
server.listen(port, () => {
  console.log(chalk.green('\n' + '✔ Express Server listening on port'), chalk.cyan(port) + '\n')
})

/**
 *  Run Browsersync and use middleware for Hot Module Replacement
 */

const bs = browserSync.create()
bs.init({
  open: process.argv[2] === '--open' ? true : false,
  logFileChanges: true,
  host: 'project.local.dev',
  proxy: {
    target: 'http://localhost:' + port
  },
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }),
    webpackHotMiddleware(bundler)
  ],
  files: [
    // put here only files that are not handle by Webpack
    configVars.viewsPath + '/**/*.twig'
  ]
  // files: [
  //     "wp-content/themes/**/*.css",
  //     {
  //         match: ["wp-content/themes/**/*.php"],
  //         fn:    function (event, file) {
  //             /** Custom event handler **/
  //         },
  //         options: {
  //             ignored: '*.txt'
  //         }
  //     }
  // ]
})

// bs.watch(
//   [
//       configVars.assetsPath + '/**/*.css',
//       configVars.assetsPath + '/**/*.js',
//       configVars.viewsPath + '/**/*.twig'
//   ], {ignored: '*.map.css'});
