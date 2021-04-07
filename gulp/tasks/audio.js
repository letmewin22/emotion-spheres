const { src, dest } = require('gulp')
const config = require('../config')

function audio() {
  return src(config.src.audio)
    .pipe(dest(config.build.audio))
}

module.exports = audio 
