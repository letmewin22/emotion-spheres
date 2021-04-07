const { src, dest } = require('gulp')
const config = require('../config')

function video() {
  return src(config.src.video)
    .pipe(dest(config.build.video))
}

module.exports = video 
