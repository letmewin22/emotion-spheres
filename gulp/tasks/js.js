const { src, dest } = require('gulp')
const webpack = require('webpack-stream')
const webpackConfig = require('../../webpack.config.js')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')

const config = require('../config')

// webpack
function js(bs) {
  return src(config.src.js)
    // @ts-ignore
    .pipe(webpack(webpackConfig(config.env)))
    .pipe(gulpif(config.production, rename('app.' + config.hash + '.js')))
    // @ts-ignore
    .pipe(dest(config.build.js))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = js
