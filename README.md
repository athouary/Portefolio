# Install

```
$ git clone git@bitbucket.org:prismamediadigital/pmd-starterpack.git
$ cd pmd-starterpack
$ npm install && npm run font && npm run start:open
```
Will install all base NPM packages, start server and open it on home page.

NOTE : You have to manualy build your icon font one time to prevent building error

# Post-Install

You have to manualy custom some param depend on your project :
* icon font name need to be set in ```package.json``` near line #33 (scripts.font) change **STARTERFONT** with the name you want for you icon font. And in **main.css**, update near line #21 the name of the file
* Atomic Mixin who are defined in ```atomic.css``` can be customizable with vars.css (see sample for creating border)

# NPM version

This StarterPack need, at least npm 3.x.x

# List commmands

* ```$ npm run info``` to display a list of all npm script
* ```$ npm run start``` or ```$ npm start``` launch an [Express](https://expressjs.com/) + [BrowserSync](https://www.browsersync.io/) local server. If you want to open your browser when server is ready ```$ npm run start:open```
* ```$ npm run build``` build, copy all your file and assets in relevant folders : all img go to ```/build/assets/img/``` folder, CSS & JS files go to ```/build/assets/main.(js|css)```, and template file are copied, with folder hierarchie.
* ```$ npm run test```to launch Style and JS linter
* ```npm run test:eslint``` perform a full linting of all JS files in ```/src/``` and reporte error in console. Follow the [Standard JS StyleGuide](http://standardjs.com/rules.html) except for indent, who are of 4 spaces.
* ```npm run test:eslintfmt``` try to format you JS file againt rules defined in ```.eslintrc``` file, if can't prompt for error.
* ```npm run test:stylelint``` perform a recursive linting of CSS file, againt [Stylelint Config Standard](https://github.com/stylelint/stylelint-config-standard), with 4 indent rule.
* ```npm run test:stylelfmt``` try to format your stylesheet according to rules specified in ```.stylelintrc``` file.

# Tools 

* [rimraf](https://github.com/isaacs/rimraf) for a better/crossplatform ```rm -rf``` you can use it like that : ```$ npm run rimraf <path/to/fileOrFolder>```
* [ncp](https://github.com/AvianFlu/ncp) Asynchronous recursive file & directory copying. Basic usage ```$ npm run ncp <source> <dest>``` 

# Usage

All path configurations should be administrable from ```project.config.js``` file. You can change where are stored views or assets folder by this way, pass some config for PostCss, and so on.

**homePage** point to the template you want to render (not the layout, the template).

**viewsPath** are related to the folder of all views basicly ```src/views```

**assetsPath** where all commons files are stored (css, js, images, etc.)/

> **viewsPath** and **assetsPath** are used by BrowserSync to know file who watch

**aliases** are used to reproduce **{% extends "@STARTERPack/layout.html.twig" %}** 

**cssNextConfig** are used by PostCSS modules.

## Twig Filter and functions mock

StarterPack use [node-twig](https://www.npmjs.com/package/node-twig) to render Twig templates. You can find mocks for Twig in the ```extensions``` folder.
