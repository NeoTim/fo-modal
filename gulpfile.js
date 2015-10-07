'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['less', 'js', 'watch']);

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/less/*.less'], ['less']);
  gulp.watch(['./src/js/*.js'], ['js']);
});
