'use strict'

var postcss = require('postcss')
var postcssrc = require('postcss-load-config')

module.exports = function (data) {
  const path = data.path;
  return postcssrc({ from: path}).then(({
      plugins,
      options
    }) => postcss(plugins).process(data.text, options))
    .then((result) => result.css)
}
