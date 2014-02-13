module.exports = function(grunt) {
  var root = grunt.option( "novel" ) || ".";
  var manuscriptsDir = root + "/manuscripts/"; 
  var outputDir = root + "/out/";
  var workingDir = outputDir + "01.Working/";
  var htmlDir = outputDir + "02.Html/";
  var ebookDir = outputDir + "03.Mobi/";
  var pdfDir = outputDir + "04.Pdf/";

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
  grunt.file.mkdir(htmlDir);
  grunt.file.mkdir(ebookDir);
  grunt.file.mkdir(pdfDir);

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

    var x = htmlDir + folder + '.html"';
    var y = ebookDir + folder + '.mobi';
    var z = pdfDir + folder + '.pdf';

    shellConfig[folder] =  {
      command: 'multimarkdown "' + concatenated + '" -o "' + x
    };
    shellConfig[folder + '_ebook'] =  {
      command: 'ebook-convert "' + x + ' ' + y
    };
    shellConfig[folder + '_pdf'] =  {
      command: 'ebook-convert "' + x + ' ' + z
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