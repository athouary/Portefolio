// Import Express and engine for Handlebars
import express from 'express'
import ExpressHandlebars from 'express-handlebars'

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
let globalData = {
  envIsProduction: process.env.NODE_ENV === 'production'
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
      const componentDataPath = resolvePath(configVars.componentsPath, componentName, `${componentName}.json`)
      fs.readFile(componentDataPath, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          Object.assign(globalData, JSON.parse(data))
        }
      })
    })
    resolve()
  })
}))

app.set('views', configVars.viewsPath)
app.use(express.static('public'))

// Create Handlebars Engine for Express
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// Get the data on server start
fetchData().then(() => {
  // Routing: handle client requests
  app.get('/', (req, res) => {
    res.render(indexPath, globalData)
  })

  app.listen('passenger')
})
