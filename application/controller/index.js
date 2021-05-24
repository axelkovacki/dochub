const ui = require('../ui');
const finder = require('../finder');
const converter = require('../converter');
const url = require('url');

function getTitleAndDescription(raw) {
  const htmlData = converter.md2Html(raw);
  const jsonData = converter.html2Json(htmlData);

  const data = jsonData.child.map(({ tag, child }) => ({ tag, child }));

  const h1 = data.filter(({ tag }) => tag === 'h1');
  const p = data.filter(({ tag }) => tag === 'p');

  return {
    title: h1[0]?.child[0]?.text ?? 'Nenhum texto encontrado',
    text: p[0]?.child[0]?.text ?? 'Nenhum texto encontrado'
  }
}

function getTags(raw) {
  let tags = raw.match(/(?<=\_\_).+?(?=\_\_)/g);
  if (tags) {
    tags = tags.filter((tag) => {
      if (tag.length === 0 || tag.length === 1) {
        return false;
      }

      return true;
    });
  }

  return tags;
}

function search(term = null) {
  let docs = [];
  finder.walk('public').forEach((route) => {
    if (route.indexOf('.md') === -1) {
      return;
    }

    const raw = finder.readFile(route);

    docs.push({
      ...getTitleAndDescription(raw),
      tags: getTags(raw),
      route,
      raw
    });
  });

  if (term) {
    term = term.toLowerCase();
    docs = docs.filter(({ title, text, tags, raw }) => {
      if (title.toLowerCase().indexOf(term) !== -1) {
        return true;
      }

      if (text.toLowerCase().indexOf(term) !== -1) {
        return true;
      }

      if (tags) {
        const terms = term.split(' ');
        const findByTag = terms.filter(
          (t) => tags.filter((tag) => tag.indexOf(t) !== -1).length
        ).length;

        if (findByTag) {
          return true;
        }
      }

      if (raw.toLowerCase().indexOf(term) !== -1) {
        return true;
      }

      return false;
    });
  }

  return docs;
}

function show(req) {
  const data = finder.readFile(req.url);
  const html = converter.md2Html(data);

  return ui.show(html);
}

function index(req) {
  const queryParams = url.parse(req.url, true).query;
  const docs = search(queryParams.search);

  return ui.index(docs);
}

module.exports = { index, show };
