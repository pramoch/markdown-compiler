const marked = require('marked');

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  // Default task(s).
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', () => {
    const files = grunt.file.expand({ cwd: './docs'}, ['*.md', '!summary.md']);
    files.map((t) => {
      const md = grunt.file.read('./docs/' + t);
      grunt.file.write('./output/' + t.replace('.md', '.html'), marked(md));
    })
  });
};