const config = require('../config')
const { src, dest } = require('gulp')
const inject = require('gulp-inject-string')
const deleteLines = require('gulp-delete-lines')

function php() {

  return src(config.src.php)
    .pipe(deleteLines({
      'filters': [
        /app\./i
      ]
    }))
    .pipe(inject.after('<!-- BEGIN scripts -->', '\n<script src="<?php echo get_template_directory_uri()?>/js/app.' + config.hash + '.js' + '"></script>'))
    .pipe(inject.after('<!-- BEGIN styles -->', '\n <link rel="stylesheet" media="all" href="<?php echo get_template_directory_uri()?>/css/app.' + config.hash + '.css' + '">'))
    .pipe(dest(config.build.php))
}

module.exports = php
