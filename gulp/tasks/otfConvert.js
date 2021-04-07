const gulp = require('gulp')
const fonter = require('gulp-fonter')
const foldersName = require('../foldersName')

const sourceFolder = foldersName.sourceFolder

function otfConvert() {
  gulp.task('otf2ttf', function() {
    return gulp.src([sourceFolder + '/fonts/*.otf'])
      .pipe(fonter({
        formats: ['ttf']
      }))
      .pipe(gulp.dest(sourceFolder + '/fonts/'))
  })
}

module.exports = otfConvert

