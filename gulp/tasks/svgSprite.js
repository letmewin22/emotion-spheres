const gulp = require('gulp')
const foldersName = require('../foldersName')
const config = require('../config')
const sourceFolder = foldersName.sourceFolder
const svgSprite = require('gulp-svg-sprite')

function svgSprites() {
  gulp.task('svgSprite', function() {
    return gulp.src([sourceFolder + '/iconsprite/*.svg'])
      .pipe(svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg', //sprite file name
            example: true
          }
        },
      }
      ))
      .pipe(gulp.dest(config.build.img))
  })
}

module.exports = svgSprites

