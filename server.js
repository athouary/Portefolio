/**
 * index.js
 */

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

// Create Enginee for Twig
const createEngine = require('node-twig').createEngine;

// Init Express for Twig
const app = express();

/**
*   Config Object to specify paths to views, css, js and assets
*/
const configVars = require('./project.config.js');

/**
 * Define empty object to store data
 */

var articleData = null;

app.engine('.twig', createEngine({
    root: __dirname + '/src/views',
    extensions: [
        {
            file: __dirname + '/extensions/twigDump.php',
            func: 'twigDumpExtension'
        }
    ]
}));

app.engine('.twig', createEngine({
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


// // This section is used to configure twig.
app.set('views', configVars.viewsPath);
app.set('view engine', 'twig');

fs.readFile('data/data.json', 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    articleData = JSON.parse(data);

    console.dir(articleData);
});

//Lets configure and request
// request({
//     url: 'http://modulus.io', //URL to hit
//     qs: {from: 'blog example', time: +new Date()}, //Query string data
//     method: 'GET', //Specify the method
//     headers: { //We can define headers too
//         'Content-Type': 'MyContentType',
//         'Custom-Header': 'Custom Value'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(response.statusCode, body);
//     }
// });

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

app.get('/', function(req, res) {
    res.render(configVars.homePage, {
        context: articleData,
    });
});

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

app.get('/:controller/:page', function(req, res) {
    res.render('./' + req.params.controller + '/' + req.params.page + '.html.twig', {
        context: articleData,
    });
});

/*
 * Express server to listen on port : 9000
 */
app.listen(9000);

/*
 * If needed Reload all devices when bundle is complete
 */

bundler.plugin('done', function (stats) {
    browserSync.reload();
});

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
