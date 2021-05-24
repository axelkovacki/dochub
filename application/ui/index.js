
const components = require('./components/index');

function index(cards) {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
      ${components.head}
    <body>
      <div class="row">
        <div class="col-12 mt-5 mb-5 text-center">
          ${components.search}
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-10 mt-3 mb-5 text-center">
          <div class="row justify-content-center">
            ${cards.length ?
                cards.map((props) => (
                  `
                    <div class="col-12 col-md-4 col-lg-3 mb-4">
                      ${components.card(props)}
                    </div>
                  `
                )).join('')
                :
                '<h2 class="mt-2">Nenhum resultado encontrado :(</h2>'
            }
          </div>
        </div>
      </div>
      ${components.scripts}
    </body>
    </html>
  `;

  return html;
};

function show(content) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      ${components.head}
    <body>
      <div class="row justify-content-center">
        <div class="col-11">
          <div class="mt-5">
            ${components.show(content)}
          <div>
        <div>
      <div>
      ${components.scripts}
    </body>
    </html>
  `;

  return html;
};

module.exports = { index, show };