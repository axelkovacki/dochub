module.exports = (props) => `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${props.title}</h5>
      <p class="card-text">
        ${props.text}
      </p>
      <a href="${props.route}" class="btn btn-primary">Visualizar</a>
    </div>
  </div>
`;
