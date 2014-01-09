module.exports = function(grunt) {
  var root = grunt.option( "novel" ) || ".";
  var manuscriptsDir = root + "/manuscripts/"; 
  var workingDir = root + "/01.Working/";
  var outDir = root + "/02.Production/"

  console.log("Using the manuscripts directory '" + manuscriptsDir + '"');

  var endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var process = function(src, filepath) {
    var path = require('path');
    var filedir = path.dirname(filepath);
    var filename =  filepath.substr(filedir.length + 1);
    var parts = filename.split('.');
    if (parts[parts.length-1].toLowerCase() == "mmd") {
      parts.pop();
    }
    var name = parts[parts.length -1];
    return "# " + name + grunt.util.linefeed + grunt.util.linefeed + src;
  };

  var concatConfig = {
      options: {
        separator: grunt.util.linefeed + grunt.util.linefeed,
        process:process
      }
  };

  grunt.file.mkdir(workingDir);
  grunt.file.mkdir(outDir);
  var folders = grunt.file.expand({ filter: 'isDirectory', cwd:manuscriptsDir }, ['*']);
  console.log(folders);

  var shellConfig = {};

  for(var i in folders) {
    var folder = folders[i];
    var concatenated = workingDir + folder + ".mmd";
    concatConfig[folder] = {
      src: manuscriptsDir + folder + "/**/*.mmd",
      dest: concatenated
    };
    shellConfig[folder] =  {
      command: 'multimarkdown "' + concatenated + '" -o "' + outDir + folder + '.html"' 
    };
  }

  grunt.initConfig({
    concat: concatConfig,
    shell: shellConfig,
    watch: {
      options: { atBegin: true },
      files: [manuscriptsDir + '**/*.mmd'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('default', ['concat', 'shell']);

};