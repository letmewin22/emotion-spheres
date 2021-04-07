const browsersync = require('browser-sync').create()
const gulp = require('gulp')
const del = require('del')

const config = require('././gulp/config')

const server = require('./gulp/tasks/server').bind(null, browsersync)
const html = require('./gulp/tasks/html').bind(null, browsersync)
const php = require('./gulp/tasks/php').bind(null)
const css = require('./gulp/tasks/css').bind(null, browsersync)
const js = require('./gulp/tasks/js').bind(null, browsersync)
const images = require('./gulp/tasks/images').bind(null, browsersync)
const fonts = require('./gulp/tasks/fonts').bind(null, browsersync)
const video = require('./gulp/tasks/video').bind(null, browsersync)
const audio = require('./gulp/tasks/audio').bind(null, browsersync)

const svgSprites = require('./gulp/tasks/svgSprite')
const otfConvert = require('./gulp/tasks/otfConvert')
const fontsInclude = require('./gulp/tasks/fontsInclude')


function wpBuild(done) {
  config.setEnv('production')
  config.logEnv()
  done()
}

function wpDev(done) {
  config.setEnv('development')
  config.logEnv()
  done()
}

otfConvert()

svgSprites()


function watchFiles() {
  gulp.watch([config.watch.html], html)
  gulp.watch([config.watch.css], css)
  gulp.watch([config.watch.js], js)
  gulp.watch([config.watch.img], images)
  gulp.watch([config.watch.video], video)
  gulp.watch([config.watch.audio], audio)
}

function clean() {
  return del(config.clean)
}

function cleanPHP() {
  return del([config.cleanJS, config.cleanCSS], {force: true})
}


const build = gulp.series(
  clean,
  wpBuild,
  gulp.parallel(js, css, html, images, fonts, video, audio)
)

const tophp = gulp.series(
  cleanPHP,
  wpBuild,
  gulp.parallel(php, js, css)
)

const dev = gulp.series(
  clean,
  gulp.parallel(js, css, html, images, fonts, video, audio)
)

const watch = gulp.series(
  wpDev,
  gulp.parallel(dev, watchFiles, server)
)


exports.fonts = fonts
exports.images = images
exports.video = video
exports.audio = audio
exports.js = js
exports.css = css
exports.html = html
exports.fi = fontsInclude
exports.clean = clean
exports.tophp = tophp
exports.build = build
exports.watch = watch
exports.default = watch
