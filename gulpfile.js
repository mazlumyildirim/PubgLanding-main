'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const { watch, series } = require('gulp');

function style() {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
}

exports.default = function() {
    watch('./assets/sass/**/*.scss', style);
};