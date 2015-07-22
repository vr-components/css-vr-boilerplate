var gulp = require('gulp');
var async = require('async');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var flags = require('minimist')(process.argv.slice(2));

// Gulp command line arguments
// e.g: gulp --production
// Gulp command line arguments
var production = flags.production || false;
var debug = flags.debug || !production;
var watch = flags.watch;

gulp.task('build', function(callback) {
  async.series([
     function (next) {
        gulp.src([
        'lib/vendor/three.js',
        'src/perspective.js',
        'src/cssvr.js'
        ])
        .pipe(gulpif(debug, sourcemaps.init()))
        .pipe(gulpif(production, uglify()))
        .pipe(concat('cssvr.js'))
        .pipe(gulpif(debug, sourcemaps.write()))
        .pipe(gulp.dest('./dist/'))
        .on('end', next);
      },
      function (next) {
        gulp.src(['style/cssvr.css'])
            .pipe(gulp.dest('./dist/'))
            .on('end', next);
      }], callback)
});

gulp.task('clean', function() {
   return gulp.src(['./dist'], {read: false})
          .pipe(clean({force: true}));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['src/*.js','src/*/*.js', 'gulpfile.js'], ['dist']);
});

gulp.task('server', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: "examples/index.html",
      port: 9000
    }));
});

gulp.task('default', ['clean', 'build'])
