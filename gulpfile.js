'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    cache       = require('gulp-cache'),
    rename      = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ''
        },
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});