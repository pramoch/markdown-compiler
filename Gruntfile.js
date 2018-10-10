const marked = require('marked');

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  // Default task(s).
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', () => {
    var md = grunt.file.read('./docs/Test.md');
    const html = marked(md);
    grunt.file.write('./output/index.html', html);
  });
};