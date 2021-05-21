const fs = require('fs');
const ui = require('../application/ui');

function handler(req) {
  const data = fs.readFileSync(req.route, 'binary');
  const html = ui.struct(req.route, data);

  return html;
}

module.exports = { handler };
