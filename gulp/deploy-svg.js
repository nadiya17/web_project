/* SVG */
var gulp = require('gulp'),
    config = require('./config'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('deploy-svg', function () {
    return gulp.src(config.pathTo.Src.Svg)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(newer(config.pathTo.Deploy.Svg))
        .pipe(gulp.dest(config.pathTo.Deploy.Svg))
        .pipe(reload({stream: true}));
});
