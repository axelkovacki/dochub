const http = require('http');
const router = require('../application/router');

function init(port = 8080) {
  http.createServer((req, res) => {
    try {
      res.writeHead(200);

      const html = router.handler(req);

      res.write(html, 'binary');
      res.end();
    } catch (err) {
      res.writeHead(404);
      return res.end(JSON.stringify(err));
    }
  }).listen(port);
}

module.exports = { init };