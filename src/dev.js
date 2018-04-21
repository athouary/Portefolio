// Import Express and engine for Handlebars
import express from 'express'
import ExpressHandlebars from 'express-handlebars'
import Locale from 'locale'

// Import path tools
import { resolve as resolvePath } from 'path'
import fs from 'fs'

// Import main config Object to specify paths to views and components
import configVars from '../config/project.config.js'

// Init Express Server
const app = express()
const hbs = ExpressHandlebars.create({
  layoutsDir: configVars.viewsPath,
  partialsDir: configVars.componentsPath,
  defaultLayout: 'index.hbs',
  extname: '.hbs'
})
const languages = ['fr', 'en']
let globalData = {
  en: {
    envIsProduction: false
  },
  fr: {
    envIsProduction: false
  }
}

// Create Handlebars Engine for Express
app.set('views', configVars.viewsPath)
app.set('port', process.env.PORT || 9000)
app.use(Locale(languages, 'fr'))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// Regex to match the component name
const componentNameRegex = new RegExp('(/[a-z]*)$')
const indexPath = resolvePath(configVars.viewsPath, 'index.hbs')

// Promise to get the data from all the components
const fetchData = () => (new Promise((resolve, reject) => {
  hbs.getPartials().then(function (components) {
    Object.keys(components).map(componentPath => {
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
// Get the data on server start
fetchData()

// Routing: handle client requests
app.get('/', (req, res) => {
  let currentLanguage
  // Refresh the data on every request
  fetchData().then(() => {
    if (languages.indexOf(req.query.lang) >= 0) {
      currentLanguage = req.query.lang
    } else {
      currentLanguage = req.locale
    }
    res.render(indexPath, globalData[currentLanguage])
  })
})

export default app
