module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-smushit');

    // config
    grunt.initConfig({
        smushit: { path: '../assets/pics' },
        min: {
            main: {
                // minify and bundle several js files together 
                src: [
                    '../vendor/js/*.js',
                    'js/*.js'
                ],
                dest: 'assets/js/script.min.js',
                separator: ';'
            },
        },
        stylus: {
            compile: {
                options: {
                  compress: true
                },
                files: {
                  '../assets/css/style.css': ['../vendor/css/*.css', '../css/*.styl']
                }
            }
        },
        watch: {
            min: {
                files: ['../js/*'],
                tasks: 'min'
            },
            stylus: {
                files: ['../css/*'], 
                tasks: 'stylus'
            }
        }
    });
};
