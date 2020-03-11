/* Images */
var gulp = require('gulp'),
    config = require('./config'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');


gulp.task('deploy-images', function () {
    return gulp.src(config.pathTo.Src.Images)

        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'Images Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        .pipe(newer(config.pathTo.Deploy.Images))
        .pipe(gulp.dest(config.pathTo.Deploy.Images))
        .pipe(reload({stream: true}));
});
