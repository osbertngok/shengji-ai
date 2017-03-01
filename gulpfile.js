'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const srcDir = './src/';
const testDir = './test/';

gulp.task('lint', () => {
  return gulp.src([srcDir + '**/*.js', '!node_modules/**'])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src([testDir + '**/*.js'])
             .pipe(mocha({
                'recursive': true
             }));
})