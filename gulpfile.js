// require gulp
var gulp 	 = require('gulp');
// require gulp uglify
var uglify 	 = require('gulp-uglify');
// require gulp jshint
var jshint   = require('gulp-jshint');
// require gulp concat
var concat   = require('gulp-concat');
// require gulp watcher
var watcher  = require('gulp-watch');
// require gulp rename
var rename   = require('gulp-rename');
// require gulp minify css
var minify   = require('gulp-minify-css');
// require gulp rimraf 
var rimraf   = require('gulp-rimraf');
// require run sequence
var sequence = require('run-sequence');

// bower components path
var BOWER_PATH 		    = __dirname + '/bower_components';
// application vendor path
var APP_VENDOR_PATH     = __dirname + '/application/assets/vendor';
// application build path
var APP_BUILD_PATH      = __dirname + '/application/build/app';
// application styles build path
var STYLES_BUILD_PATH   = __dirname + '/application/build/assets/styles';
// application scripts build path
var SCRIPTS_BUILD_PATH  = __dirname + '/application/build/assets/scripts';

// application controllers path
var CONTROLLER_PATH     = __dirname + '/application/controllers/**/*.js';
// application components path
var COMPONENTS_PATH     = __dirname + '/application/components/**/*.js';
// application decorator path
var DECORATOR_PATH      = __dirname + '/application/decorator/**/*.js';
// application services path
var SERVICES_PATH       = __dirname + '/application/services/**/*.js';
// application scripts path
var APP_SCRIPTS_PATH    = __dirname + '/application/assets/scripts/**/*.js';
// application styles path
var APP_STYLES_PATH     = __dirname + '/application/assets/styles/**/*.css';

// move bower_components/* to vendor
gulp.task('install-vendor', function() {
    // initialize path to move
    return gulp.src([BOWER_PATH + '/**/*'])
    // save to destination path
    .pipe(gulp.dest(APP_VENDOR_PATH));
});

// clean vendor folder
gulp.task('clean-vendor', function() {
    // initialize path to clean
    return gulp
    // initialize path to clean, read false
    .src(APP_VENDOR_PATH, { read : false })
    // clean directory
    .pipe(rimraf({ force : true }));
});

// minify controllers
gulp.task('minify-controllers', function() {
    // initialize gulp, read src
    return gulp.src(CONTROLLER_PATH)
    // set build file name
    .pipe(concat('controllers.js'))
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(APP_BUILD_PATH));
});

// minify components / directives
gulp.task('minify-components', function() {
    // initialize gulp, read src
    return gulp.src(COMPONENTS_PATH)
    // set build file name
    .pipe(concat('components.js'))
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(APP_BUILD_PATH));
});

// minify decorators
gulp.task('minify-decorators', function() {
    // initialize gulp, read src
    return gulp.src(DECORATOR_PATH)
    // set build file name
    .pipe(concat('decorator.js'))
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(APP_BUILD_PATH));
});

// minify services
gulp.task('minify-services', function() {
    // initialize gulp, read src
    return gulp.src(SERVICES_PATH)
    // set build file name
    .pipe(concat('services.js'))
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(APP_BUILD_PATH));
});

// minify scripts
gulp.task('minify-scripts', function() {
    // initialize gulp, read src
    return gulp.src(APP_SCRIPTS_PATH)
    // set build file name
    .pipe(concat('scripts.js'))
    // uglify with variable mangle
    .pipe(uglify({ mangle : true }))
    // rename extension to .min.js
    .pipe(rename({ extname : '.min.js' }))
    // save to destination path
    .pipe(gulp.dest(SCRIPTS_BUILD_PATH));
});

// minify styles
gulp.task('minify-styles', function() {
   // initialize gulp, read src
    return gulp.src(APP_STYLES_PATH)
    // set build file name
    .pipe(concat('styles.css'))
    // minify css
    .pipe(minify())
    // rename extension to .min.css
    .pipe(rename({ extname : '.min.css' }))
    // save to destination path
    .pipe(gulp.dest(STYLES_BUILD_PATH));
});

// set up injector
gulp.task('inject-dependency', function() {

});

// set up build task
gulp.task('build', [
    'minify-controllers', 
    'minify-components',
    'minify-decorators',
    'minify-services',
    'minify-scripts',
    'minify-styles'
]);

// set up clean task
gulp.task('clean', function() {
    // initialize path to clean
    return gulp
    // initialize path to clean, read false
    .src([
        APP_BUILD_PATH + '/**/*',
        SCRIPTS_BUILD_PATH + '/**/*',
        STYLES_BUILD_PATH + '/**/*'
    ], { read : false })
    // clean directory
    .pipe(rimraf({ force : true }));
});

// set up gulp watcher
gulp.task('watch', function() {
    // watch folders
    gulp.watch([
        'application/controllers/**/*.js',
        'application/components/**/*.js',
        'application/decorator/**/*.js',
        'application/services/**/*.js',
        'application/assets/styles/**/*.css',
        'application/assets/scripts/**/*.js'
    ], ['build']);
});

// set up install task
gulp.task('install', function(callback) {
    sequence('clean-vendor', 'install-vendor', callback);
});

// set up default task
gulp.task('default', function() {
	gulp.start('watch');
});