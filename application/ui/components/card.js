module.exports = (props) => `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${props.title}</h5>
      ${props.tags ? props.tags.map((tag) => (
        `
          <span class="badge bg-success mt-1 mb-3">${tag}</span>
        `
      )).join('') : ''}
      <p class="card-text">
        ${props.text}
      </p>
      <a href="${props.route}" class="btn btn-primary">Visualizar</a>
    </div>
  </div>
`;
