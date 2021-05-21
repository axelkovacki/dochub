const path = require('./path');
const controller = require('./controller');

function getRoute(req) {
  let { url } = req;

  if (url === '/') {
    url = '/index.md'
  }

  return path.resolve(`docs${url}`);
}

function handler(req) {
  req.route = getRoute(req);
  return controller.handler(req);
}

module.exports = { handler };
