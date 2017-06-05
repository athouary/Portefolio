require('babel-register')

if ( process.env.NODE_ENV !== 'production' ) {
  require('./server')
} else {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.prod.config')

  webpack(webpackConfig.default, (err, stats) => {

    if (err || stats.hasErrors()) {
      // Fatal webpack errors (wrong configuration, etc)
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();
      // Compilation errors (missing modules, syntax errors, etc)
      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      // Compilation warnings
      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }
    }
    // Done processing
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      assets: true,
      colors: true    // Shows colors in the console
    }));
  })

}
