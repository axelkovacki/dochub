module.exports = (content = '') => `
  <div class="card p-5">
    <div class="card-body text-left">
      <div class="mb-3">
        <a href="javascript:history.back()">Voltar</a>
      </div>
      ${content}
    </div>
  </div>
`;
