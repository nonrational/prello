/* jshint node: true */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                "Gruntfile.js", "*.js", "lib/**/*.js", "spec/**/*.js"
            ]
        },
        jasmine_nodejs: {
            options: {
                specNameSuffix: "spec.js",
                stopOnFailure: false,
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: false,
                        verbosity: 4,
                        listStyle: "indent",
                        activity: false
                    }
                },
            },
            unit: {
                specs: [
                    "spec/lib/**",
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    grunt.registerTask('default', ['jshint', 'jasmine_nodejs:unit']);
};
