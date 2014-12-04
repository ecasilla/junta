'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' * License: <%= pkg.license %>\n' +
    ' */\n',
		jsbeautifier: {
			files: ['<%= jshint.all %>'],
			options: {
				config: '.jsbeautify'
			}
		},
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: ['lib/**/*.js','Gruntfile.js']
        }
      }
    },
		simplemocha: {
			options: {
				globals: ['expect', 'navigator'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: 'test/**/*.js'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'lib/**/*.js',
				'!doc/**/*.js',
				'test/**/*.js',
				'package.json',
			]
		},
		jsdoc: {
			dist: {
				src: ['lib/**/*.js'],
				options: {
          template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
          configure : "jsdoc.conf.json",
					destination: 'doc/html'
				}
			}
		},
		watch: {
			options: {
				interrupt: true
			},
			js: {
				files: ['<%= jshint.all %>'],
				tasks: ['newer:simplemocha:all', 'newer:jshint:all', 'newer:jsbeautifier', 'doc']
			}
		}
	});

	// Loading dependencies
	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key.indexOf('grunt') === 0 && key !== 'grunt') {
			grunt.loadNpmTasks(key);
		}
	}
	grunt.registerTask('doc', 'jsdoc');
	grunt.registerTask('test', 'simplemocha');
	grunt.registerTask('lint', 'jshint');
	grunt.registerTask('default', ['lint', 'doc', 'test']);
};
