const showdown = require('showdown');
const converter = new showdown.Converter();

function md2Html(data) {
  return converter.makeHtml(data);
}

module.exports = { md2Html };
