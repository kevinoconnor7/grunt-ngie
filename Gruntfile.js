/*
 * ngie
 * https://github.com/jsolis/grunt-ngie
 *
 * Copyright (c) 2014 Jason Solis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    ngie: {
      default_options: {
        options: {
          fileDestOverride: 'tmp/index-default.html'
        },
        files: {
          'test/indexFiles/index.html': ['test/fixtures/compiled']
        }
      },
      custom_options: {
        options: {
          fileDestOverride: 'tmp/index-custom.html',
          destTag: 'body'
        },
        files: {
          'test/indexFiles/index.html': ['test/fixtures/compiled']
        }
      },
      directory_options: {
        options: {
          fileDestOverride: 'tmp/index-directory.html'
        },
        files: {
          'test/indexFiles/index.html': ['test/fixtures/directives/**/*.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ngie', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
