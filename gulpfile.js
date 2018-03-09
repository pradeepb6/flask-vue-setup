'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    vueify = require('vueify'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    del = require('del'),
    plugins = require('gulp-load-plugins')(),
    paths = {
        src: 'src',
        index_path: 'app/templates',
        app: 'src/app',
        styles: 'src/styles',
        serve: 'static',
        dist: 'dist'
    },
    files = glob.sync(paths.app + '/**/*.js'),
    browserSync = require('browser-sync');

// General browsersync function
function browserSyncInit(baseDir, files, browser) {
    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        server: {
          baseDir: baseDir
        },
        notify: false
    });
}

// Watch files
gulp.task('watch', ['parse'], function () {
    gulp.watch([
        paths.app + '/**/*.vue',
        paths.app + '/**/*.js',
        paths.app + '/**/*.scss',
        paths.src + '/**/*.html'
    ], ['parse']);
});

// Parse the scss files
gulp.task('scss', function () {
    return gulp.src(paths.styles + '/**/*.scss')
        .pipe(plugins.sass().on('error', function (error) {
            console.log('***** SASS ERROR: ' + error);
        }))
        .pipe(gulp.dest(paths.serve + '/styles'));
});

// Parse files
gulp.task('parse', ['clean', 'scss'], function () {
    var options = {
        read: false,
        ignorePath: [paths.dist],
        addRootSlash: false
    };

    // we need to copy the index file to the serve folder
    gulp.src(paths.index_path + '/index.html')
        .pipe(plugins.inject(gulp.src([paths.serve + '/styles/**/*.css']), options))
        .pipe(gulp.dest(paths.index_path));

    // parse the js modules
    browserify({
            entries: files,
            paths: [ paths.app ]
        })
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.log('***** BROWSERIFY ERROR: ' + err.message);
            this.emit('end');
        })
        .pipe(source('build.js'))
        .pipe(gulp.dest(paths.serve + '/scripts'));

//     gulp.src(paths.app + 'main.js')
//         .pipe(browserify({ transform: ['vueify', 'babelify', 'aliasify'] }))
//         .pipe(gulp.dest(paths.serve + '/scripts'))
});

// Build files
gulp.task('build', ['parse'], function () {
    var options = {
            read: false,
            ignorePath: [paths.dist],
            addRootSlash: false
        },

        watched = gulp.watch([paths.serve], function () {
            gulp.src(paths.serve + '/scripts/build.js')
                .pipe(plugins.uglify())
                .pipe(plugins.rename('build.js'))
                .pipe(gulp.dest(paths.dist + '/scripts'));

            gulp.src(paths.serve + '/styles/**/*.css')
                .pipe(plugins.minifyCss())
                .pipe(plugins.concat('styles.css'))
                .pipe(gulp.dest(paths.dist + '/styles'));

            gulp.src(paths.index_path + '/index.html')
                .pipe(plugins.inject(gulp.src([paths.dist + '/styles/**/*.css']), options))
                .pipe(gulp.dest(paths.dist));

            // We'll give it a little offset just in case some tasks haven't ended yet
            setTimeout(function () {
                watched.end();
            }, 1000);
        });
});

// Start a dev server
// gulp.task('serve', ['watch'], function () {
//     var watched = gulp.watch([paths.serve], function () {
//         browserSyncInit([ paths.serve ], [
//             paths.src + '/**/*.js',
//             paths.src + '/**/*.vue',
//             paths.app + '/**/*.vue',
//             paths.index_path + '*.html',
//             paths.src + '/**/*.html'
//         ]);
//
//         watched.end();
//     });
// });

// Start a prod server
// gulp.task('serve:dist', ['build'], function () {
//     var watched = gulp.watch([ paths.dist], function () {
//         browserSyncInit(paths.dist);
//         // stop watching
//         watched.end();
//     });
// });

// Delete the previous generated folder before building
gulp.task('clean', function () {
    del.sync(paths.dist + '/**/*');
    del.sync(paths.serve + '/**/*');
});

gulp.task('default', ['clean'], function () {
    gulp.start('watch');
});