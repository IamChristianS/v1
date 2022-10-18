module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")

        jade:
            build:
                options:
                    pretty: true
                    data: 
                        debug: true
                files:
                    "./build/index.html": ["./dev/index.jade"]
            release:
                options:
                    pretty: false
                    data: 
                        debug: false
                files:
                    "./dist/index.html": ["./dev/index.jade"]

        less:
            options:
                paths: ["./dev/css"]
            build:
                options:
                    dumpLineNumbers: true
                    sourceMap: true
                    sourceMapRootpath: "/game-off-2013/"
                files:
                    "./build/css/main.css": "./dev/css/main.less"

            release:
                options:
                    compress: true
                    cleancss: true
                    relativeUrls: true
                files:
                    "./dist/css/main.css": "./dev/css/main.less"

        browserify2:
            build:
                debug: true
                entry: "./dev/js/main.js"
                compile: "./build/js/main.js"

        uglify:
            options:
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n"

            release:
                src: "./build/js/main.js"
                dest: "./dist/js/main.min.js"

        copy: 
            build: 
                files: [
                    expand: true
                    cwd: "./dev/media/"
                    src: ["**/*.jpg","**/*.json","**/*.png","sounds/*.mp3","music/*.mp3","fonts/*","swf/*"]
                    dest: "./build/media/"
                ]
            release: 
                files: [
                    expand: true
                    cwd: "./build/media/"
                    src: ["**/*.jpg","**/*.json","**/*.png","sounds/*.mp3","music/*.mp3","fonts/*","swf/*"]
                    dest: "./dist/media/"
                ]
            libs:
                files: [
                    expand: true
                    cwd: "./dev/js/lib/"
                    src: ["./soundmanager2-nodebug-jsmin.js", "./jquery.color-2.1.2.min.js", "./jquery-1.10.1.min.js"]
                    dest: "./build/js/"
                ]
            libsrelease:
                files: [
                    expand: true
                    cwd: "./dev/js/lib/"
                    src: ["./soundmanager2-nodebug-jsmin.js", "./jquery.color-2.1.2.min.js", "./jquery-1.10.1.min.js"]
                    dest: "./dist/js/"
                ]

        clean:
            build: ["./build/media"]
            release: ["./dist"]

        cleanlevel:
            all:
                src: ["./dev/media/data/levels/*.json"]
                dest: "./build/media/data/levels"

        watch:
            build:
                options:
                    livereload: true
                files: ["./build/**"]
            cleanlevel:
                files: ["./dev/media/data/levels/*.json"]
                tasks: ["cleanlevel"]
            css:
                files: ["./dev/css/**/*.less"]
                tasks: ["less:build"]

            jade:
                files: ["./dev/*.jade"]
                tasks: ["jade:build"]

            js:
                files: ["./dev/js/**/*.js"]
                tasks: ["browserify2", "copy:libs"]

            media: 
                files: ["./dev/media/**/*"]
                tasks: ["copy:build", "cleanlevel:all"]

        # jshint:
        #     compile: ["./dev/js/**/*.js"]
        
    
    grunt.loadNpmTasks "grunt-contrib-less"
    grunt.loadNpmTasks "grunt-contrib-jade"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-browserify2"
    # grunt.loadNpmTasks "grunt-contrib-jshint"

    grunt.loadTasks "./tasks"

    grunt.registerTask "release", ["clean:release", "jade:release", "less:release", "browserify2", "uglify", "copy:release", "copy:libsrelease", "cleanlevel:all"]
    grunt.registerTask "default", ["clean:build", "jade:build", "less:build", "browserify2", "copy:build", "copy:libs", "cleanlevel:all"]