module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      files: ['js/test/*.js'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['nodeunit']);

};