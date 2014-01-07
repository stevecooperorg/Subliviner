module.exports = function(grunt) {
  var root = grunt.option( "root" ) || ".";
  var manuscriptsDir = root + "/manuscripts/"; 
  var workingDir = root + "/01.Working/";
  var outDir = root + "/02.Production/"

  console.log("Using the manuscripts directory '" + manuscriptsDir + '"');

  var concatConfig = {
      options: {
        separator: grunt.util.linefeed + grunt.util.linefeed
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