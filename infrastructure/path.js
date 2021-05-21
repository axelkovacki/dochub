const path = require('path');

function resolve(url) {
  return path.join(process.cwd(), url);
}

module.exports = { resolve };
