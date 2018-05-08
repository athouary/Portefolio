'use strict'

const path = require('path')

const configSite = {
  viewsPath: path.join(__dirname, '../views'),
  componentsPath: path.join(__dirname, '../views/components'),
  cssNextConfig: function () {
    return {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      features: {
        customProperties: {
          variables: {
            '--GutterSize': 0 + 'px'
          }
        }
      }
    }
  }
}

module.exports = configSite
