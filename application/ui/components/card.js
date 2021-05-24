function formatText(text = '') {
  if(text.length > 40) {
    text = `${text.substring(0, 120)}...`;
  }

  return text;
}

module.exports = (props) => `
  <a href="${props.route}">
    <div class="card">
      <div class="card-body hover-shadow d-flex align-items-center">
        <div class="w-100">
          <h5 class="card-title">${props.title}</h5>
          <p class="card-text mb-2">
            ${formatText(props.text)}
          </p>
          <div class="w-100">
            ${props.tags ? props.tags.map((tag) => (
              `
                <span class="badge bg-success">${tag}</span>
              `
            )).join('') : ''}
          </div>
          <button type="button" class="btn btn-primary mt-3">Visualizar</button>
        </div>
      </div>
    </div>
  </a>
`;
