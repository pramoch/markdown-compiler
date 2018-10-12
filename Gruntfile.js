const marked = require('marked');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      template: {
        expand: true,
        cwd: 'template/',
        src: ['**', '!content.html'],
        dest: 'output/'
      },
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

    let template = grunt.file.read('./template/content.html');
    template = updateSidebar(template);

    const patterns = ['**/*.md', '!summary.md'];
    const files = grunt.file.expand({ cwd: './docs' }, patterns);
    files.map((fileName) => {
      convertToHtml(fileName, template);
    });
  }

  const updateSidebar = (template) => {
    let sidebarMarkdown = grunt.file.read('./docs/summary.md');
    sidebarMarkdown = sidebarMarkdown.split('.md').join('.html');
    const sidebarHtml = marked(sidebarMarkdown);
    return template.replace('%sidebar%', sidebarHtml);
  }

  const convertToHtml = (fileName, template) => {
    let docMarkdown = grunt.file.read('./docs/' + fileName);
    const docHtml = marked(docMarkdown);
    const fullContent = template.replace('%content%', docHtml);
    grunt.file.write('./output/' + fileName.replace('.md', '.html'), fullContent);
  };
};