const fs = require('fs')
const config = require('../config')
const foldersName = require('../foldersName')

function fontsStyle(cb) {

  const path = foldersName.sourceFolder + '/scss/helpers/fonts-include.scss'
  const path2 = foldersName.sourceFolder + '/templates/partials/_fonts-include.html'

  fs.writeFile(path, '', cb)
  fs.writeFile(path2, '', cb)
  return fs.readdir(config.build.fonts, function(err, items) {
    if (items) {
      let cFontname
      for (let i = 0; i < items.length; i++) {
        let fontname = items[i].split('.')
        fontname = fontname[0]
        if (cFontname !== fontname) {
          fs.appendFile(path, '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb)
          fs.appendFile(path2, `<link rel="preload" href="./fonts/${fontname}.woff" type="font/woff" as="font" crossorigin="anonymous">\r\n`, cb)
        }
        cFontname = fontname
      }
    }
  })
  cb()
}

module.exports = fontsStyle
