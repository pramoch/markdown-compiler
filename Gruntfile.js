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
        cwd: 'template/',
        src: ['**/*', '!content.html'],
        dest: 'output/'
      },
      swagger: {
        expand: true,
        cwd: 'docs/',
        src: ['**/*.json'],
        dest: 'output/'
      }
    },
    watch: {
      markdown: {
        files: ['docs/**', 'template/**'],
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
    grunt.file.delete('output');

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
    const files = grunt.file.expand({ cwd: 'docs/' }, patterns);
    files.map((fileName) => {
      convertToHtml(fileName, template);
    });
  }

  const getHtmlTemplate = () => {
    let template = grunt.file.read('template/content.html');

    // Update sidebar content
    let sidebarMarkdown = grunt.file.read('docs/summary.md');
    sidebarMarkdown = sidebarMarkdown.split('.md').join('.html');
    const sidebarHtml = marked(sidebarMarkdown);
    return template.replace('%sidebar%', sidebarHtml);
  }

  const convertToHtml = (fileName, template) => {
    const updatedTemplate = updateActiveLink(fileName, template);

    let docMarkdown = grunt.file.read('docs/' + fileName);
    const docHtml = marked(docMarkdown);
    const fullContent = updatedTemplate.replace('%content%', docHtml);
    grunt.file.write('output/' + fileName.replace('.md', '.html'), pretty(fullContent));
  };

  const updateActiveLink = (fileName, template) => {
    const searchValue = 'href="/' + fileName.replace('.md', '.html') + '"';
    return template.replace(searchValue, searchValue + ' active');
  }
};