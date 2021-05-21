
const converter = require('../converter');

const components = require('./components/index');

function detail(content) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      ${components.head}
    <body>
      <div class="row justify-content-center">
        <div class="col-11">
          <div class="mt-5">
            ${components.detail(content)}
          <div>
        <div>
      <div>
      ${components.scripts}
    </body>
    </html>
  `;

  return html;
};

function home(content) {
  const props = {
    title: 'AWS',
    text: 'Lorem ips ulsoda msaldkmaslkmd',
    route: '/back.md'
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      ${components.head}
    <body>
      <div class="row">
        <div class="col-12 mt-5 mb-5 text-center">
          ${components.search}
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-10 mt-3 mb-5 text-center">
          <div class="row">
            <div class="col-12 col-md-4 col-lg-3 mb-4">
              ${components.card(props)}
            </div>
            <div class="col-12 col-md-4 col-lg-3 mb-4">
              ${components.card(props)}
            </div>
            <div class="col-12 col-md-4 col-lg-3 mb-4">
              ${components.card(props)}
            </div>
            <div class="col-12 col-md-4 col-lg-3 mb-4">
              ${components.card(props)}
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <div class="mt-5">
            ${components.detail(content)}
          <div>
        <div>
      <div>
      ${components.scripts}
    </body>
    </html>
  `;

  return html;
};

function isHome(route) {
  return route.indexOf('index') !== -1;
}

function struct(route, data = null) {
  const content = converter.md2Html(data);
  const html = isHome(route) ? home(content) : detail(content);

  return html;
}

module.exports = { struct };