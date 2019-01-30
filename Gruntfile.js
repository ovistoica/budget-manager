'use strict';

var libs = ['bootstrap-notify', 'bootstrap', 'vue', 'bootbox', 'lodash', 'vuex', 'vue-resource', 'vue-router', 'jquery', 'xterm', 'xterm/lib/addons/fit/fit', 'reconnectingwebsocket', 'md5', 'moment', 'xterm', 'vue2-ace-editor', 'liquor-tree'];

var fs = require ('fs');
var path = require ('path');

module.exports = function(grunt) {
	var tasks = {
		browserify: {
			ui: {
				files: {
					'build/ui/js/login.js': ['src/ui/js/login.js'],
					'build/ui/js/lab.js': ['src/ui/js/lab.js'],
					'build/ui/js/admin.js': ['src/ui/js/admin.js'],
				},
				options: {
					transform: ['vueify']
				}
			},
			docs: {
				files: {
					'build/docs/js/script.js': ['src/docs/js/script.js'],
				},
				options: {
					external: null
				}
			},
			vendor: {
				src: [],
				dest: 'build/ui/js/vendor.js',
				options: {
					external: null,
					require: libs,
				},
			},
			freeboard: {
				files: {
					'build/ui/js/freeboard/wyliodrinData.js': 'src/ui/js/freeboard/wyliodrinData.js'
				},
				options: {
					external: null
				}
			},
			options: {
				external: libs,
			},
		},

		copy: {
			server: {
				files: [{
					expand: true,
					cwd: 'src/server',
					src: ['**/*'],
					dest: 'build/server/'
				},
				// {
				// 	expand: true,
				// 	cwd: 'src/server/bin',
				// 	src: ['*'],
				// 	dest: 'build/server/bin/'
				// },
				// {
				// 	expand: true,
				// 	cwd: 'src/server/database',
				// 	src: ['*'],
				// 	dest: 'build/server/database/'
				// },
				// {
				// 	expand: true,
				// 	cwd: 'src/server/routes',
				// 	src: ['*'],
				// 	dest: 'build/server/routes/'
				// }
				]
			},
			ui: {
				files: [{
					expand: true,
					cwd: 'src/ui/img',
					src: ['**/*'],
					dest: 'build/ui/img/'
				},
				{
					expand: true,
					cwd: 'src/ui',
					src: ['**/*.html'],
					dest: 'build/ui'
				},
				{
					expand: true,
					cwd: 'src/ui/freeboard',
					src: ['**/*'],
					dest: 'build/ui/freeboard',
					extDot: 'first'
				},
				{
					expand: true,
					cwd: 'src/ui/fonts',
					src: ['**/*'],
					dest: 'build/ui/fonts/'
				},
				]
			},

			docs: {
				files: [{
					expand: true,
					cwd: 'src/docs/',
					src: ['**/*', '!**/*.js'],
					dest: 'build/docs/',
					extDot: 'first'
				}, ]
			}
		},
		//clean the build folder
		clean: {
			all: 'build',
			client: 'build/client',
			server: 'build/server',
			docs: 'build/docs'
		},
		less: {
			docs: {
				files: {
					'build/docs/css/docs.css': 'src/docs/css/docs.less'
				}
			},
			vendor: {
				files: {
					'build/ui/style/wyliodrin.css': 'src/ui/style/style.less',
					'build/ui/style/studio.css': 'src/ui/style/studio.less',
					// 'build/ui/style/admin.css': 'src/ui/style/admin.less',
					'build/ui/style/vendor.css': 'src/ui/style/vendor.less'
				}
			}
		},
		eslint: {
			gruntfile: 'Gruntfile.js',
			server: ['src/server/**/*.js'],
			ui: ['src/ui/**/*.js', 'src/ui/**/*.vue']
		}
	};

	grunt.initConfig(tasks);
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('server', ['eslint:server', 'copy:server']);

	grunt.registerTask('ui', ['eslint:ui', 'browserify', 'less', 'copy:ui']);

	grunt.registerTask('docs', ['browserify:docs', 'copy:docs', 'less:docs']);
	grunt.registerTask('fastui', ['eslint:ui', 'browserify:ui' ]);

	grunt.registerTask('default', ['server', 'ui', 'docs']);
};
