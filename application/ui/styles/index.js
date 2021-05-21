const fs = require('fs');
const path = require('../../../infrastructure/path');

function getMainStyle() {
  const location = path.resolve('application/ui/styles/main.css');
  return fs.readFileSync(location, 'binary');
}

module.exports = {
  main: getMainStyle()
};
