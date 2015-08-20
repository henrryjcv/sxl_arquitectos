module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            debug: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'source',
                        dest: 'source',
                        src: '*.jade',
                        ext: '.html'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        cwd: 'source',
                        dest: 'dist',
                        src: '*.jade',
                        ext: '.html'
                    }
                ]
            }
        },
        sass: {
            debug: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'source/css/main.css': 'source/sass/main.scss'
                }
            },
            release: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/main.css': 'source/sass/main.scss'
                }
            }
        },
        coffee: {
            debug: {
                options: {
                  join: true
                },
                files: {
                    'source/js/init.js': 'source/coffeescript/init.coffee'
                }
            },
            release: {
                options: {
                  join: true
                },
                files: {
                    'dist/js/init.js': 'source/coffeescript/init.coffee'
                }
            }
        },
        watch: {
            jadewatch: {
                files: ['source/*.jade', 'source/layout/*.jade', 'source/layout/includes/*.jade'],
                tasks: ['jade:debug']
            },
            sasswatch: {
                files: ['source/sass/*.scss'],
                tasks: ['sass:debug'],
                options: {
                    livereload: true
                }
            },
            coffeewatch: {
                files: ['source/coffeescript/*.coffee'],
                tasks: ['coffee:debug']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-coffeelint');

    // Definicion de tareas
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('produccion', ['jade:release', 'sass:release', 'coffee:release']);

};