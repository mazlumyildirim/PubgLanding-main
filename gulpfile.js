'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const { watch, series } = require('gulp');

function style() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
}

// function javascript(cb) {
//   // body omitted
//   cb();
// }

exports.default = function() {
  // You can use a single task
  watch('./assets/sass/**/*.scss', style);
  // Or a composed task
  // watch('./assets/script/*.js', series(style, javascript));
};