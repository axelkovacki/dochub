const path = require('../../infrastructure/path');
const fs = require('fs');

function resolveDir(dir) {
  return path.resolve(dir);
}

function listFilesInDir(dir) {
  return fs.readdirSync(resolveDir(dir));
};

function readFile(dir, type = 'binary') {
  return fs.readFileSync(
    resolveDir(dir),
    type
  );
}

module.exports = {
  listFilesInDir,
  readFile
};
