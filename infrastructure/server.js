const http = require('http');
const router = require('../application/router');

function init(port = 8081) {
  http.createServer((req, res) => {
    try {
      res.writeHead(200);

      const html = router.handler(req);

      res.write(html, 'binary');
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      return res.end(err.message);
    }
  }).listen(port);
}

module.exports = { init };