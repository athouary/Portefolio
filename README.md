# Install

```
$ git clone git@github.com:ethyde/StarterPack.git
$ cd StarterPack
$ npm install && npm run server open
```
Will install all base NPM packages, start server and open it on home page.

# List commmands

* ```$ npm run server``` launch an [Express](https://expressjs.com/) + [BrowserSync](https://www.browsersync.io/) local server. If you want to open your browser when server is ready ```$ npm run server open```
* ```$ npm run build:prod``` build, copy all your file and assets in relevant folders : all img go to ```/build/assets/img/``` folder, CSS & JS files go to ```/build/assets/main.(js|css)```, and template file are cpy, with folder hierarchie.
* ```npm run eslint:test``` perform a full linting of all JS files in ```/src/``` and reporte error in console. Follow the [Standard JS StyleGuide](http://standardjs.com/rules.html) except for indent, who are of 4 spaces.
* ```npm run eslint:format``` try to format you JS file againt rules defined in ```.eslintrc``` file, if can't prompt for error.
* ```npm run stylelint:test``` perform a recursive linting of CSS file, againt [Stylelint Config Standard](https://github.com/stylelint/stylelint-config-standard), with 4 indent rule.
* ```npm run stylefmt:test``` try to format your stylesheet according to rules specified in ```.stylelintrc``` file.

# Tools 

* [rimraf](https://github.com/isaacs/rimraf) for a better/crossplatform ```rm -rf``` you can use it like that : ```$ npm run rimraf <path/to/fileOrFolder>```

# Usage

All path configurations should be administrable from ```project.config.js``` file. You can change where are stored views or assets folder by this way, pass some config for PostCss, and so on.

**homePage** point to the template you want to render (not the layout, the template).

**viewsPath** are related to the folder of all views basicly ```src/views```

**assetsPath** where all commons files are stored (css, js, images, etc.)/

> **viewsPath** and **assetsPath** are used by BrowserSync to know file who watch


**aliases** are used to reproduce **{% extends "@STARTERPack/layout.html.twig" %}** 

**neatConfig** and **cssNextConfig** are used by PostCSS modules.

## Twig Filter and functions mock

StarterPack use [node-twig](https://www.npmjs.com/package/node-twig) to render Twig templates. You can find mocks for Twig in the ```extensions``` folder.
