
import chalk from 'chalk'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import app from './config/app'
import webpackConfig from './webpack.dev.config'
import configVars from './config/project.config.js'

const bundler = webpack(webpackConfig)
const port = app.get('port')
const bs = browserSync.create();

// Listen on port 9000 for Express
app.listen(port, () => {
  console.log( chalk.green('\n' + '✔ Express Server listening on port'), chalk.cyan( port ) + '\n')
})

/**
 *  Run Browsersync and use middleware for Hot Module Replacement
 */

// const bs = browserSync.create();
bs.init({
    open: process.argv[2] === '--open' ? true : false,
    logFileChanges: true,
    proxy: {
      target : 'localhost:' + port,
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
      ]
    },
    files: [
      configVars.assetsPath + '/**/*.css',
      configVars.assetsPath + '/**/*.js',
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
