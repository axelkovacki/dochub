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

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;

    let stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

module.exports = {
  listFilesInDir,
  readFile,
  walk
};
