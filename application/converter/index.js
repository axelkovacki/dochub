const showdown = require('showdown');
const htmlConverter = require('html2json');
const mdConverter = new showdown.Converter();

function md2Html(data) {
  return mdConverter.makeHtml(data);
}

function html2Json(data) {
  return htmlConverter.html2json(data);
}


module.exports = { md2Html, html2Json };
