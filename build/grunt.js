module.exports = function(grunt) {
    var rootDir = __dirname + '/../',
        stylusOptions = { compile: {options: {compress: true}, files: {}} };

    stylusOptions.compile.files[rootDir + 'assets/css/style.css'] = [rootDir + 'vendor/css/*.css', rootDir + 'css/*.styl'];

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-smushit');

    // config
    grunt.initConfig({
        smushit: { path: {src: rootDir + 'assets/pics' }},
        min: {
            main: {
                // minify and bundle several js files together 
                src: [
                    rootDir + 'vendor/js/*.js',
                    rootDir + 'js/*.js'
                ],
                dest: rootDir + 'assets/js/script.min.js',
                separator: ';'
            },
        },
        stylus: stylusOptions,
        index: {
            rootDir: rootDir
        },
        watch: {
            index: {
                files: [rootDir + 'templates/**/*'],
                tasks: 'index'
            },
            min: {
                files: [rootDir + 'js/**/*'],
                tasks: 'min'
            },
            vendor_js: {
                files: [rootDir + 'vendor/js/**/*'],
                tasks: 'min'
            },
            vendor_css: {
                files: [rootDir + 'vendor/css/**/*'],
                tasks: 'stylus'
            },
            stylus: {
                files: [rootDir + 'css/**/*'], 
                tasks: 'stylus'
            }
        }
    });

    grunt.registerTask('default', 'index stylus min');
};
