(function () {
    'use strict';

    module.exports = function (grunt) {

        grunt.loadNpmTasks('grunt-bower-task');

        grunt.initConfig({
            bower: {
                install: {
                    options: {
                        targetDir: 'vendors',
                        layout: 'byComponent',
                        cleanTargetDir: false
                    }
                }
            }
        });

        grunt.registerTask('default', ['bower:install']);
    };
}());