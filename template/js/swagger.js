window.onload = function () {
  const swagger = document.querySelectorAll('.swagger');
  swagger.forEach(function (item) {
    const id = item.id;
    const file = item.dataset.swaggerFile;
    createSwagger(id, file);
  });
};

createSwagger = function (id, file) {
  SwaggerUIBundle({
    url: file,
    dom_id: '#' + id,
    presets: [SwaggerUIBundle.presets.apis],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl]
  });
};
