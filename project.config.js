const path = require('path');

/**
*   Configuration file for the current project
*   homePage : the homepage for the NodeJs server
*   viewsPath: The main path where the views templates are stored
*   cssPath: the path where the CSS files are stored (to be watched with Browsersync)
*   jsPath: the path where the JS files are stored (to be watched with Browsersync)
*   assets: An object to specify the route and the actual path where the assets are stored
*   aliases: Aliases for the templates
*/
const configSite = {
    homePage : './components/home/index.html.twig',
    viewsPath : path.join(__dirname, '/src/views'),
    assetsPath : './src/assets',
    aliases: {
        'STARTERPack': path.join(__dirname, '/src/views')
    },
    neatConfig: {
        neatMaxWidth: "1170px",
        neatGutterWidth: "1.875em",
    },
    cssNextConfig: {
        browsers: ['last 2 versions'],
        features: {
            customProperties: {
                variables: {
                    "--GutterSize": "30px"
                }
            }
        }
    }

}

// module.exports = config
// export {config, configCss}
module.exports = configSite;
