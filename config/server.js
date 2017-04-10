/**
 *  Require Browsersync along with webpack and middleware for it
 */
import express from 'express'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.config'

/**
 *  Require some tools path, fs, express, etc.
 */
import { resolve as resolvePath } from 'path'
import fs from 'fs'
import { _extend as extend } from 'util'
import request from 'request'
import dir from 'node-dir'
import 'colors'

// Create Enginee for Twig
import { createEngine as twigCreateEngine } from 'node-twig'

/**
 *  Config Object to specify paths to views, css, js and assets
 */
import configVars from './project.config.js'
const bundler = webpack(webpackConfig);

// Init Express Server
const app = express()
/**
 *  Test NODE_ENV to production if not set
 */
const isDeveloping = process.env.NODE_ENV !== 'production';

// Create Twig Engine for Express
app.engine('twig', twigCreateEngine({
    root: configVars.viewsPath,
    extensions: [
        {
            file: resolvePath(__dirname, '../extensions/twigExtensions.php'),
            func: 'twigExtensions'
        },
        {
            file: resolvePath(__dirname, '../extensions/twigExtensionFunctions.php'),
            func: 'twigExtensionFunctions'
        },
        {
            file: resolvePath(__dirname, '../extensions/twigExtensionFilters.php'),
            func: 'twigExtensionFilters'
        }
    ],
    aliases: configVars.aliases
}));


// This section is used to configure twig.
app.set('views', configVars.viewsPath);
app.set("twig options", {
    strict_variables: false
});

app.set('port', process.env.PORT || 9000)

// Routing : handle client requests
app.get('/:component?/:template?', (req, res) => {

    const component = req.params['component'] || 'home'
    const template = req.params['template'] || 'index'
    const getQuery = Object.keys(req.query)
    const componentPath = resolvePath( configVars.viewsPath, 'components', component )
    const templatePath = componentPath + '/' + template + '.html.twig'
    const globalDataPath = resolvePath( __dirname, '../data/data.json' )
    const data = typeof Object.keys(req.query)[0] === 'undefined' ? 'default' : Object.keys(req.query)[0]
    let moduleDataPath = resolvePath( componentPath + '/fixtures/' + data + '.json' ) 
    let globalData
    let moduleData

    console.log( "data : ", typeof Object.keys(req.query), data);

    // dir.files(componentPath + '/fixtures/', function(err, files) {
    //     if (err) { throw err };

    //     console.log( 'subdir', files);
    // })

    try {
        fs.statSync( moduleDataPath )
    } catch( e ) {
        moduleDataPath =  resolvePath( componentPath + '/fixtures/defaultjson' ) 
    }

    // Add Global DATA to the page
    fs.readFile(globalDataPath, 'utf8', (err, data) => {

        if (err) {
            console.log('Error: ' + err);
            return;
        }

        globalData = Object.assign({}, JSON.parse(data));

        fs.readFile( moduleDataPath, (err, data) => {
            
            globalData = Object.assign(globalData, {
                env_serv: process.env.NODE_ENV,
                foo: 'bar',
                stuff: ['This', 'can', 'be', 'anything']
            })

            if (err) {
                console.log( err )
            } else {
                res.render( templatePath, {
                    context: extend(globalData, JSON.parse( data ))
                })
            }

        })
    });

})

/*
 *  If needed Reload all devices when bundle is complete
 */

// bundler.plugin('done', function (stats) {
//     browserSync.reload();
// });

/**
 *  Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
    open: process.argv[2] === 'open' ? true : false,
    logFileChanges: true,
    proxy: {
        target : 'localhost:9000',
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
});

export default app
