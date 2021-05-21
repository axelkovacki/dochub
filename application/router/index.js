const controller = require('../controller');

function isIndex(url) {
  if (url.indexOf('?search') !== -1) {
    return true;
  }

  return url === '/' || url === '/index.md';
}

function handler(req) {
  if (isIndex(req.url)) {
    return controller.index(req);
  }

  return controller.show(req);
}

module.exports = { handler };
