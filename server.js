'use strict';

/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync          = require('browser-sync');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig        = require('./webpack.dev.config');
const bundler              = webpack(webpackConfig);

/**
 * Require some tools path, fs, express, etc.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const request = require('request');
const extend = require('util')._extend

// Create Enginee for Twig
const twigCreateEngine = require('node-twig').createEngine;

// Init Express for Twig
const app = express();

/**
 *  Config Object to specify paths to views, css, js and assets
 */
const configVars = require('./config/project.config.js');

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
            file: path.join(__dirname, '/extensions/twigExtensions.php'),
            func: 'twigExtensions'
        },
        {
            file: path.join(__dirname, '/extensions/twigExtensionFunctions.php'),
            func: 'twigExtensionFunctions'
        },
        {
            file: path.join(__dirname, '/extensions/twigExtensionFilters.php'),
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

// Add Global DATA to the page
fs.readFile('data/data.json', 'utf8', function (err, data) {

    if (err) {
        console.log('Error: ' + err);
        return;
    }

    pageData = JSON.parse(data);

});

// Basic Static route
// app.get('/', function(req, res) {
//     res.render('./components/home/index.html.twig', {
//         context: {
//             foo: 'bar',
//             stuff: ['This', 'can', 'be', 'anything'],
//             pageData: articleData
//         }
//     });
// });

// Routing : handle client requests
app.get('/:component?/:template?', function(req, res) {

    let component = req.params.component || 'home'
    let template = req.params.template || 'index'
    let data = Object.keys(req.query)[0] || 'default'
    let componentPath = path.join( configVars.viewsPath, 'components', component )
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
// app.get('/cars', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end("Here are my cars. Beautiful collection, isn't it?");
// });

// Dynamic route sample
// app.get('/cars/:brand/:color', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('You want to see my ' + req.params.color + ' ' + req.params.brand + '? Follow me.');
// });

// app.get('/:controller/:page', function(req, res) {
//     res.render( req.params.controller + '/' + req.params.page + '.html.twig', {
//         context: articleData,
//     });
// });

/*
 * Express server to listen on port : 9000
 */
app.listen(9000);

/*
 * If needed Reload all devices when bundle is complete
 */

// bundler.plugin('done', function (stats) {
//     browserSync.reload();
// });

/**
 * Run Browsersync and use middleware for Hot Module Replacement
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
