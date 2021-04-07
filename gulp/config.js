const util = require('gulp-util')
const foldersName = require('./foldersName')

const projectFolder = foldersName.projectFolder
const sourceFolder = foldersName.sourceFolder

const production = util.env.production || util.env.prod || false

const config = {
  
  env: 'development',
  production: production,
  templates: sourceFolder + '/templates',
  hash: 'e' + Date.now(),
  build: {
    html: projectFolder + '/',
    php: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    img: projectFolder + '/img/',
    video: projectFolder + '/video/',
    audio: projectFolder + '/audio/',
    fonts: projectFolder + '/fonts/',
  },
  src: {
    templates: 'src/templates',
    html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html', '!' + sourceFolder + '/data'],
    php: projectFolder + '/**/*.php',
    css: sourceFolder + '/scss/app.scss',
    js: sourceFolder + '/js/app.js',
    img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    video: sourceFolder + '/video/*',
    audio: sourceFolder + '/audio/*',
    fonts: sourceFolder + '/fonts/*.ttf',
  },
  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/scss/**/*.{scss,sass}',
    js: sourceFolder + '/js/**/*.{js,json,glsl}',
    img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    video: sourceFolder + '/video/*',
    audio: sourceFolder + '/audio/*'
  },
  clean: './' + projectFolder + '/',
  cleanJS: projectFolder + '/js/app.*',
  cleanCSS: projectFolder + '/css',

  setEnv: function(env) {
    if (typeof env !== 'string') return
    this.env = env
    this.production = env === 'production'
    process.env.NODE_ENV = env
  },

  logEnv: function() {
    util.log(
      'Environment:',
      util.colors.white.bgMagenta(' ' + process.env.NODE_ENV + ' ')
    )
  },

  // errorHandler: require('./util/handle-errors')
}

config.setEnv(production ? 'production' : 'development')

module.exports = config 
