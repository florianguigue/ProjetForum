let gulp = require('gulp');
let less = require('gulp-less');
let concat = require('gulp-concat');
let cssbeautify = require('gulp-cssbeautify');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');
let path = require('path');

function build() {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(concat('style.css'))
    .pipe(cssbeautify({indent: '  '}))
    .pipe(gulp.dest('./public/css'));
};

function watchLess() {
  gulp.watch('./src/less/**/*.less', build);
};

function prod() {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/css'));
};

// Tâche "build"
const dev = gulp.series(build, watchLess);
//gulp.task('dev', ['build', 'watch-less']);

exports.dev = dev;
exports.default = dev;
