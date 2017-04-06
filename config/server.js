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

/**
 *  Define empty object to store data
 */

let pageData = {};

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

// Add Global DATA to the page
fs.readFile('data/data.json', 'utf8', (err, data) => {

    if (err) {
        console.log('Error: ' + err);
        return;
    }

    pageData = JSON.parse(data);

});

// Basic Static route
// app.get('/', (req, res) => {
//     res.render('./components/home/index.html.twig', {
//         context: {
//             foo: 'bar',
//             stuff: ['This', 'can', 'be', 'anything'],
//             pageData: articleData
//         }
//     });
// });

// Routing : handle client requests
app.get('/:component?/:template?', (req, res) => {

    let component = req.params.component || 'home'
    let template = req.params.template || 'index'
    let data = Object.keys(req.query)[0] || 'default'
    let componentPath = resolvePath( configVars.viewsPath, 'components', component )
    let templatePath = componentPath + '/' + template + '.html.twig'

    fs.readFile( componentPath + '/fixtures/' + data + '.json', (err, data) => {
        
        pageData = extend(pageData, {
            env_serv: process.env.NODE_ENV,
            foo: 'bar',
            stuff: ['This', 'can', 'be', 'anything']
        })

        if (err) {
            console.log( err )
        } else {
            res.render( templatePath, {
                context: extend(pageData, JSON.parse( data ))
            })
        }


    })
})

// Custom header sample
// app.get('/cars', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end("Here are my cars. Beautiful collection, isn't it?");
// });

// Dynamic route sample
// app.get('/cars/:brand/:color', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('You want to see my ' + req.params.color + ' ' + req.params.brand + '? Follow me.');
// });

// app.get('/:controller/:page', (req, res) => {
//     res.render( req.params.controller + '/' + req.params.page + '.html.twig', {
//         context: articleData,
//     });
// });

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
