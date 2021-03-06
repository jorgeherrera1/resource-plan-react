'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var del = require('del');

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('fonts', function() {
  return gulp.src(['./node_modules/materialize-css/fonts/**/*'])
    .pipe(gulp.dest('public/fonts/'));
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('styles', function() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src(['app/styles/**/*.scss'])
    .pipe(concat('main.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({precision: 10}).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(cssnano(/*{
      discardComments: {
        removeAll: true
      }
    }*/))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('js', function() {
  var b = browserify({
    entries: ['app/main.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  b.transform('babelify')
  //b.transform('browserify-shim')
  b.on('update', bundle);
  b.on('log', gutil.log);
  return bundle();

  function bundle() {
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/js'));
  }
});

gulp.task('serve', ['images', 'fonts', 'html', 'styles', 'js'], function() {
  browserSync.init({
    // Don't show any notifications in the browser
    notify: false,
    // Console log prefix
    logPrefix: 'RP',
    //server: 'public',
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: 'google chrome',
    reloadDelay: 1000
  });

  gulp.watch(['app/**/*.html'], ['html', browserSync.reload]);
  gulp.watch(['app/styles/**/*.scss'], ['styles', browserSync.reload]);
  gulp.watch(['app/**/*.js'], ['lint', browserSync.reload]);

  return nodemon({
    script: 'server.js',
    watch: ['server.js']
  }).on('start', function() {
    setTimeout(function(){
      browserSync.reload();
    }, 500);
  });
});

gulp.task('clean', function() {
  del(['public']);
});

gulp.task('default', ['serve']);
