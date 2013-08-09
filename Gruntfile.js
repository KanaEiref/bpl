module.exports = function(grunt) {

  var sourcePath = 'app/';
  var desPath = 'assets/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Jekyll
    jekyll: {
      dist: {
        src: sourcePath + 'jekyll/',
        dest: sourcePath + 'jekyll/_site'
      }
    },

    // Copy
    copy: {
      jekyll: {
        files: [{
          'expand': true,
          'cwd': sourcePath + 'jekyll/_site',
          'src': ['**/*.html'],
          'dest': ''
        }]
      },
      single: {
        files: [
          {
            src: ['app/js/kanascript.js'], 
           dest: 'assets/js/kanascript.js'}
        ]
      }
      /*,
      js:{
        files: [{
          'src': ['app/js/kanascript.js'],
          'dest': ['assets/js/kanascript.js'],
        }]
      }  not working */
    },

    // Sass
    sass: {
      dev: {
        src: sourcePath + 'css/style.scss',
        dest: desPath + 'css/style.css',
        options: {
          style: 'expanded',
          lineNumbers: true
        }
      },
      prod: {
        src: sourcePath + 'css/style.scss',
        dest: desPath + 'css/style.css',
        option: {
          style: 'compressed'
        }
      }
    },

    // JavaScripts

   uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      
      files: {

          dest: desPath + 'js/kanascript.min.js',
          src: sourcePath + 'js/**/*.js'
          
        }

    },

    jshint: {
      files: ['Gruntfile.js',  sourcePath + 'js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      stylesheets: {
        files: sourcePath + 'css/*.scss',
        tasks: 'sass'
      },
      javascript: {
        files: ['Gruntfile.js', sourcePath + 'js/*.js'] ,
        tasks: ['jshint', 'copy', 'uglify']
      },
      jekyll: {
        files: [
          sourcePath + 'jekyll/**/*.html',
          '!' + sourcePath + 'jekyll/_site/**/*.html'
        ],
        tasks: ['jekyll', 'copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');

 // grunt.registerTask('default', ['jekyll', 'copy', 'sass', 'jshint']);
  grunt.registerTask('default', ['jekyll', 'copy', 'sass', 'jshint', 'uglify']);

};