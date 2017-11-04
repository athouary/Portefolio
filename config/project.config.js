'use strict';

const path = require('path')

/**
 *   Configuration file for the current project
 *   homePage : the homepage for the NodeJs server
 *   viewsPath: The main path where the views templates are stored
 *   cssPath: the path where the CSS files are stored (to be watched with Browsersync)
 *   jsPath: the path where the JS files are stored (to be watched with Browsersync)
 *   assets: An object to specify the route and the actual path where the assets are stored
 *   aliases: Aliases for the templates
 */
const gridMixin = require('./mixins.js')

const configSite = {
  homePage: './components/home/index.html.twig',
  viewsPath: path.join(__dirname, '../src/views'),
  assetsPath: path.join(__dirname, '../src/assets'),
  aliases: {
    'STARTERPack': path.join(__dirname, '../src/views')
  },
  gridMaxWidth: '1170px',
  gridWidths: ['10', '15', '20', '25', '33.33', '45', '50', '60', '66.33', '75', '85', '90', '100'],
  gridBreakpoints: new Map([
    ['lg', 1200],
    ['md', 1024],
    ['sm', 768],
    ['xs', 480]
  ]),
  gridGutterSize: 20,
  gridOuterSpacing: 10,
  mixins: {
    gridCalc: function () {
      return gridMixin(configSite)
    }
  },
  cssNextConfig: function () {
    return {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      features: {
        customProperties: {
          variables: {
            '--GutterSize': this.gridGutterSize + 'px'
          }
        }
      }
    }
  }
}

// module.exports = config
// export {config, configCss}
module.exports = configSite
