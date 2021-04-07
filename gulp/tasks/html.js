const config = require('../config')
const nunjucksRender = require('gulp-nunjucks-render')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const { src, dest } = require('gulp')
const webphtml = require('gulp-webp-html')
const gulpif = require('gulp-if')
const inject = require('gulp-inject-string')

function html(bs) {

  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  })

  return src([config.src.templates + '/**/[^_]*.html'])
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.templates]
    }))
    .pipe(gulpif(config.production, webphtml()))
    // @ts-ignore
    .pipe(gulpif(config.production, inject.replace('app.js', 'app.' + config.hash + '.js')))
    // @ts-ignore
    .pipe(gulpif(config.production, inject.replace('app.css', 'app.' + config.hash + '.css')))
    .pipe(prettify({
      indentSize: 2,
      wrapAttributes: 'auto', // 'force'
      preserveNewlines: false,
      // unformatted: [],
      endWithNewline: true
    }))
    .pipe(dest(config.build.html))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = html
