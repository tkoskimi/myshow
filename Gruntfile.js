module.exports = function( grunt ) {
	
	var dirConfig = {
		src: "app",
		test: "test",
		build: "build"
	};

	grunt.initConfig( {
		dirs: dirConfig,

		clean: {
			build: {
				src: [ "<%= dirs.build %>" ]
			}
		},

		copy: {
			build: {
				expand: true,
				cwd: "<%= dirs.src %>",
				src: [ "libs/**" ],
				dest: "<%= dirs.build %>"
			}
		},

		jshint: {
			options: {
				esnext: true
			},
			files: {
				src: [
					"Gruntfile.js",
					"<%= dirs.src %>/**/*.js"
				]
			}
		},

	    babel: {
	        options: {
	            sourceMap: true,
	            presets: ['es2015']
	        },
	        dist: {
	            files: [ {
	            	expand: true,
	            	cwd: "<%= dirs.src %>",
					src: [ "**/*.js" ],
					dest: "<%= dirs.build %>"
	            } ]
	        }
	    }
	} );

	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-babel" );

	grunt.registerTask( "test", [
		"jshint",
		"clean:build",
		"copy:build",
		"copy:test",
		"babel"
	] );
	grunt.registerTask( "default", [ "jshint", "clean:build", "copy:build", "babel" ] );

};
