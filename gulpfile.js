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
// require gulp inject
var inject   = require('gulp-inject');
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

// injector target path
var INJECT_TARGET_PATH  = __dirname + '/application/views/index.html';

// application files
var files = {
    // default application scripts
    'default' : {
        tag   : { starttag : '<!-- inject:app-default -->' },
        path  : [
            './application/app.constants.js',
            './application/app.module.js',
            './application/app.config.js',
            './application/app.routes.js'
        ]
    },

    // production application scripts
    'app-scripts' : {
        tag  : { starttag : '<!-- inject:app-scripts -->' },
        path : './application/build/app/**/*.js'
    },
    // production scripts
    'scripts' : {
        tag  : { starttag : '<!-- inject:scripts -->' },
        path : './application/build/assets/scripts/**/*.js'
    },
    // production styles
    'styles' : {
        tag  : { starttag : '<!-- inject:styles -->' },
        path : './application/build/assets/styles/**/*.css'
    },

    // development application scripts
    'app-scripts-dev' : {
        tag  : { starttag : '<!-- inject:app-scripts -->', }, 
        path : [
            './application/controllers/**/*.js',
            './application/components/**/*.js',
            './application/decorators/**/*.js',
            './application/services/**/*.js'
        ]
    },
    // development scripts
    'scripts-dev' : {
        tag  : { starttag : '<!-- inject:scripts -->' },
        path : './application/assets/scripts/**/*.js'
    },
    // development styles
    'styles-dev' : {
        tag  : { starttag : '<!-- inject:styles -->' },
        path : './application/assets/styles/**/*.css'
    },

    // production / dev 3rd party scripts
    'vendor-scripts' : {
        tag  : { starttag : '<!-- inject:third-party-scripts -->' },
        path : [
            './application/assets/vendor/angular/angular.min.js',
            './application/assets/vendor/angular-ui-router/release/angular-ui-router.min.js'
        ]
    },
    // production / dev 3rd party styles
    'vendor-styles' : {
        tag  : { starttag : '<!-- inject:third-party-styles -->' },
        path : []
    }
};

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
    .pipe(concat('decorators.js'))
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
        CONTROLLER_PATH,
        COMPONENTS_PATH,
        DECORATOR_PATH,
        SERVICES_PATH,
        APP_STYLES_PATH,
        APP_SCRIPTS_PATH
    ], ['build', 'inject']);
});

// set up gulp watch-dev
gulp.task('watch-dev', function() {
    // watch folders
    gulp.watch([
        CONTROLLER_PATH,
        COMPONENTS_PATH,
        DECORATOR_PATH,
        SERVICES_PATH,
        APP_STYLES_PATH,
        APP_SCRIPTS_PATH
    ], ['inject-dev']);
});

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

// set up install task
gulp.task('install', function(callback) {
    // run clean-vendor, install-vendor task
    sequence('clean-vendor', 'install-vendor', callback);
});

// set up injector
gulp.task('inject', function() {
    // default option
    var options = { read : false };

    // default scripts
    var appDefault      = files['default'];
    // app scripts
    var appScripts      = files['app-scripts'];
    // scripts
    var scripts         = files['scripts'];
    // styles
    var styles          = files['styles'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // set self closing tags for <link />
    styles.tag.selfClosingTag = true;

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject app default files
    .pipe(inject(gulp.src(appDefault.path, options), appDefault.tag))
    // inject app scripts
    .pipe(inject(gulp.src(appScripts.path, options), appScripts.tag))
    // inject scripts
    .pipe(inject(gulp.src(scripts.path, options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src(styles.path, options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src(vendorScripts.path, options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src(vendorStyles.path, options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('.'));
});

// set up injector - dev
gulp.task('inject-dev', function() {
    // default option
    var options = { read : false };

    // default scripts
    var appDefault      = files['default'];
    // app scripts
    var appScripts      = files['app-scripts-dev'];
    // scripts
    var scripts         = files['scripts-dev'];
    // styles
    var styles          = files['styles-dev'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // set self closing tags for <link />
    styles.tag.selfClosingTag = true;

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject app default files
    .pipe(inject(gulp.src(appDefault.path, options), appDefault.tag))
    // inject app scripts
    .pipe(inject(gulp.src(appScripts.path, options), appScripts.tag))
    // inject scripts
    .pipe(inject(gulp.src(scripts.path, options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src(styles.path, options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src(vendorScripts.path, options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src(vendorStyles.path, options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('.'));
});

// set up injector-clean
gulp.task('inject-clean', function() {
    // default option
    var options = { read : false };

    // default scripts
    var appDefault      = files['default'];
    // app scripts
    var appScripts      = files['app-scripts-dev'];
    // scripts
    var scripts         = files['scripts-dev'];
    // styles
    var styles          = files['styles-dev'];
    // vendor scripts
    var vendorScripts   = files['vendor-scripts'];
    // vendor styles
    var vendorStyles    = files['vendor-styles'];

    // setup dependency injector
    return gulp.src(INJECT_TARGET_PATH)
    // inject app default files
    .pipe(inject(gulp.src('', options), appDefault.tag))
    // inject app scripts
    .pipe(inject(gulp.src('', options), appScripts.tag))
    // inject scripts
    .pipe(inject(gulp.src('', options), scripts.tag))
    // inject styles
    .pipe(inject(gulp.src('', options), styles.tag))
    // inject vendor scripts
    .pipe(inject(gulp.src('', options), vendorScripts.tag))
    // inject vendor styles
    .pipe(inject(gulp.src('', options), vendorStyles.tag))
    // set destination
    .pipe(gulp.dest('.'));
});

// production deployment task
gulp.task('deploy', function(callback) {
    // 1. Install bower components to vendor
    // 2. Clean build files
    // 3. Build files,
    // 4. Clean Injected files,
    // 5. Inject files
    sequence('install', 'clean', 'build', 'inject-clean', 'inject', callback);
});

// development deployment task
gulp.task('deploy-dev', function(callback) {
    // 1. Install bower components to vendor
    // 2. Clean build files
    // 3. Clean Injected files,
    // 4. Inject files
    sequence('install', 'clean', 'inject-clean', 'inject-dev', callback);
});

// set up default task
gulp.task('default', function() {
	gulp.start('watch');
});