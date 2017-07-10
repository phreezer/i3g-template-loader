module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		appName: 'i3g Template Loader',
		jsFileName: 'jquery.<%= pkg.name %>',
		cssFileName: 'i3g.template-loader',
		banner: '/*!\n' +
			'* <%= pkg.name %> - v<%= pkg.version %>\n' +
			'* Homepage: <%= pkg.homepage %>\n' +
			'* Author: <%= pkg.author.name %>\n' +
			'* Author URL: <%= pkg.author.url %>\n*/\n',
		concat: {
			options: {
				separator: '\n\n',
				banner: '<%= banner %>'
			},
			js: {
				src: [
		  'src/js/app.js'
		],
				dest: 'dist/js/<%= jsFileName %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'dist/js/<%= jsFileName %>.min.js': '<%= concat.js.dest %>'
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js'],
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
			files: ['<%= concat.js.src %>', 'src/**/*.scss'],
			tasks: ['jshint', 'concat', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
