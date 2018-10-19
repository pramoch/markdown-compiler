const marked = require('marked');
const pretty = require('pretty');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      template: {
        expand: true,
        cwd: 'documents/template/',
        src: ['**/*', '!content.html'],
        dest: 'src/assets/documents/'
      },
      swagger: {
        expand: true,
        cwd: 'documents/contents/',
        src: ['**/*.json'],
        dest: 'src/assets/documents/'
      }
    },
    watch: {
      markdown: {
        files: ['documents/contents/**', 'documents/template/**'],
        tasks: 'build'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', () => {
    build();
  });

  const build = () => {
    // ===== Clean up output folder =====
    grunt.file.delete('src/assets/documents/');

    // ===== Copy template's dependency =====
    grunt.task.run('copy:template');

    // ===== Copy Swagger's JSON =====
    grunt.task.run('copy:swagger');

    // ===== Compile MD to HTML =====
    compile();
  }

  const compile = () => {
    const template = getHtmlTemplate();

    const patterns = ['**/*.md', '!summary.md'];
    const files = grunt.file.expand({ cwd: 'documents/contents/' }, patterns);
    files.map((fileName) => {
      convertToHtml(fileName, template);
    });
  }

  const getHtmlTemplate = () => {
    let template = grunt.file.read('documents/template/content.html');

    // Update sidebar content
    let sidebarMarkdown = grunt.file.read('documents/contents/summary.md');
    sidebarMarkdown = sidebarMarkdown.split('.md').join('.html');
    const sidebarHtml = marked(sidebarMarkdown);
    return template.replace('%sidebar%', sidebarHtml);
  }

  const convertToHtml = (fileName, template) => {
    const updatedTemplate = updateActiveLink(fileName, template);

    let docMarkdown = grunt.file.read('documents/contents/' + fileName);
    const docHtml = marked(docMarkdown);
    const fullContent = updatedTemplate.replace('%content%', docHtml);
    grunt.file.write('src/assets/documents/' + fileName.replace('.md', '.html'), pretty(fullContent));
  };

  const updateActiveLink = (fileName, template) => {
    // Add "active" in <a> tag if the fileName is matched
    const re = new RegExp('(href=.*' + fileName.replace('.md', '.html') + '")');
    return template.replace(re, '$1 active');
  }
};