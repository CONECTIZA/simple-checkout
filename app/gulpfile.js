const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      runSequence = require('run-sequence'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('assets/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/css'));
});
 
gulp.task('scripts', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery-mask-plugin/dist/jquery.mask.js',
      'assets/js/application.js',
    ])
    .pipe(concat('assets/js/app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('assets/scss/*.scss', ['sass']);
    gulp.watch('assets/js/application.js', ['scripts']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

