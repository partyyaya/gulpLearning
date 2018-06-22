var gulp      = require('gulp'),
  concat      = require('gulp-concat'),
  minifyCSS   = require('gulp-minify-css'),
  uglify      = require('gulp-uglify'),
  rename      = require("gulp-rename"),
  htmlreplace = require('gulp-html-replace'),
  minifyHTML  = require('gulp-minify-html');

gulp.task('concat', function() {
  return gulp.src('./app/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify-css', ['concat'], function() {
  return gulp.src('./build/css/all.css')
    .pipe(minifyCSS({
      keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/js/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('html-replace',function() {
  var opts = {comments:false,spare:false,quotes:true};
  return gulp.src('./app/*.html')
    .pipe(htmlreplace({
        'css': 'css/all.min.css',
        'js': 'js/all.min.js'
    }))  
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

//在 gulp 裏頭，所有任務並不會按照順序
gulp.task('default', ['html-replace','minify-css', 'uglify']);