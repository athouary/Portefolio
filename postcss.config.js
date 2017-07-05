const configSite = require('./config/project.config.js');
const path = require('path');

const cssnextConfig = configSite.cssNextConfig()

const config = {
  plugins: [
    require('postcss-import')({
        path: path.resolve(__dirname, './src/assets/styles') // Du to some bug with resolve of relative/absolute path we need to define it here ATM
    }),
    require('postcss-mixins')({
        mixins: configSite.mixins
    }),
    require('postcss-url')(),
    require('postcss-cssnext')(
        cssnextConfig
    ),
    require('postcss-nesting')(),
    require('css-mqpacker')({
        sort: true
    })
  ]
}

module.exports = config
