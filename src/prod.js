// Import Express and engine for Handlebars
import express from 'express'
import https from 'https'
import ExpressHandlebars from 'express-handlebars'
import Locale from 'locale'

// Import path tools
import { resolve as resolvePath } from 'path'
import fs from 'fs'

// Import main config Object to specify paths to views and components
import configVars from '../config/project.config.js'
import helpers from './helpers.js'

// Init Express Server
const app = express()

https.createServer({
  key: fs.readFileSync('/home/thougjyh/ssl/certs/auxane_thouary_com_bd093_af675_1562616856_2d29acccbb4d1b392ee6e57ea155a12e.crt'),
  cert: fs.readFileSync('/home/thougjyh/ssl/certs/auxane_thouary_com_be6bc_80223_1538853309_86d3151f69bd8fd6a4e0bb93a52be97c.crt')
}, app).listen('passenger')

const hbs = ExpressHandlebars.create({
  layoutsDir: configVars.viewsPath,
  partialsDir: configVars.componentsPath,
  defaultLayout: 'index.hbs',
  extname: '.hbs',
  helpers
})
const languages = ['fr', 'en']
let globalData = {
  en: {
    envIsProduction: true
  },
  fr: {
    envIsProduction: true
  }
}

// Regex to match the component name
const componentNameRegex = new RegExp('(/[a-z]*)$')
const indexPath = resolvePath(configVars.viewsPath, 'index.hbs')

// Promise to get the data from all the components
const fetchData = () => (new Promise((resolve, reject) => {
  hbs.getPartials({
    cache: true
  }).then(function (components) {
    Object.keys(components).map(componentPath => {
      // TODO: put the component path in the project config
      const componentName = componentPath.replace(componentNameRegex, '')
      Object.keys(globalData).map((language) => {
        const componentDataPath = resolvePath(configVars.componentsPath, componentName, `${componentName}.${language}.json`)
        fs.readFile(componentDataPath, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            Object.assign(globalData[language], JSON.parse(data))
          }
        })
      })
    })
    resolve()
  })
}))

app.set('views', configVars.viewsPath)
app.use(express.static('public'))
app.use(Locale(languages, 'fr'))

// Create Handlebars Engine for Express
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// Get the data on server start
fetchData().then(() => {
  // Routing: handle client requests
  app.get('/', (req, res) => {
    let currentLanguage
    if (languages.indexOf(req.query.lang) >= 0) {
      currentLanguage = req.query.lang
    } else {
      currentLanguage = req.locale
    }
    res.render(indexPath, globalData[currentLanguage])
  })

  app.listen('passenger')
})
