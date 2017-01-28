
var gulp  = require('gulp');
var clean = require('gulp-clean');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var gulpif  = require('gulp-if');
var rev    = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var taskReplace = require('gulp-replace-task');

var cssmin  = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

var PATH_ASSETS = './assets';
var PATH_PUBLIC = './public';

var PATH_TMP = './release/tmp';
var PATH_REV = './release/rev';
var PATH_MIN = './release/min';


var config = require('./build/config');

var path = require('path');

var env = process.env.NODE_ENV || 'dev';


var ASSETS_PATH = {
    html: './page/**/*.html',
    js:   './js/**/*.js',
    css:  './css/**/*.css',
    img:  './images/**/*',
};

// 清理目录 release
gulp.task('clean', function(){
    return gulp.src(['./release'], {read: false})
    .pipe(clean());
});
 
// 清理目录 rev
gulp.task('clean-rev', ['min'], function(){
    return gulp.src(['./release/rev'], {read: false})
    .pipe(clean());
});
 
// 文件 reb hash
gulp.task('rev-hash', ['useref' ], function () {
    var css = path.join(PATH_TMP, ASSETS_PATH.css)
    var js  = path.join(PATH_TMP, ASSETS_PATH.js)
    var files = [css, js];
    console.log('rev:',files)
    return gulp.src(files , { base: PATH_TMP })
        .pipe(rev())
        .pipe(gulp.dest(PATH_REV))
        .pipe(rev.manifest())
        .pipe(gulp.dest(PATH_REV))
});

// 文件 rev replace
gulp.task("rev-replace", ['rev-hash'], function(){
    var manifest = gulp.src( PATH_REV + "/rev-manifest.json");
    var html = path.join( PATH_TMP, ASSETS_PATH.html);

    var js   = path.join( PATH_REV, ASSETS_PATH.js);
    var css  = path.join( PATH_REV, ASSETS_PATH.css);

    var files = [html, js, css];
    return gulp.src( files , { base: PATH_TMP })
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest( PATH_REV ) );
});

// 文件 copy public js
gulp.task('copy-public', ['rev-replace'], function () {
    var css = path.join(PATH_PUBLIC, ASSETS_PATH.css);
    var js  = path.join(PATH_PUBLIC, ASSETS_PATH.js);
    var files = [css, js];
    console.log('copy-public:',files)
    return gulp.src(files, { base: './' } )
        .pipe(gulp.dest( PATH_TMP ))
        .pipe(gulp.dest( PATH_MIN ))
});

// 文件 copy assets img
gulp.task('copy-assets', ['rev-replace'], function () {
    var img = path.join(PATH_ASSETS, ASSETS_PATH.img);
    var files = [img];
    console.log('copy-assets:',files)
    return gulp.src(files, { base: PATH_ASSETS } )
        .pipe(gulp.dest( PATH_TMP ))
        .pipe(gulp.dest( PATH_MIN ))
});

// 文件 copy html 合并 请求
gulp.task('useref', ['clean'], function () {
    var replace_assets = replace('/assets/', '../');

    return gulp.src(ASSETS_PATH.html )
        .pipe(useref())
        .pipe(gulpif('*.js', replace_assets))
        .pipe(gulpif('*.css', replace_assets))
        .pipe(gulp.dest( PATH_TMP + '/page' ));
});

// 文件 css prefix
gulp.task('css-prefix',  ['min'] , function () {
    var css  = path.join(PATH_MIN, ASSETS_PATH.css);
    return gulp.src( css , { base: PATH_MIN })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest( PATH_MIN ));
});

// 文件 min
gulp.task('min', ['copy-assets', 'rev-replace'], function () {
    var css  = path.join(PATH_REV, ASSETS_PATH.css);
    var html = path.join(PATH_REV, ASSETS_PATH.html);
    var js   = path.join(PATH_REV, ASSETS_PATH.js);
    var css  = path.join(PATH_REV, ASSETS_PATH.css);
    var files = [css, html, js, css];

    console.log('min:',files);
    var patterns = config.patterns[env] || [];
    console.log( patterns )

    return gulp.src(files, { base: PATH_REV } )
        .pipe(gulpif('*.css'  , cssmin()))
        // .pipe(gulpif('*.js' , uglify()))  // uglify 在webpack 的时候做了。
        .pipe(gulpif('*.html' , htmlmin({collapseWhitespace: true}) ))

        .pipe(gulpif('*.js' , taskReplace({ patterns: patterns }) ))
        .pipe(gulpif('*.css' , taskReplace({ patterns: patterns }) ))
        .pipe(gulpif('*.html' , taskReplace({ patterns: patterns }) ))

        .pipe(gulp.dest( PATH_MIN ));
});

// 打包
// 拷贝 pub 目录
// 
// 拷贝 html 
// 拷贝 combo css js
// 
// 文件 js eslint
// 文件 js ugliy
// 
// 文件 css prefix
// 文件 css mini
// 
// 文件 rev hash 
// 文件 rev replace 
// 
gulp.task('build', 
    [
    'clean', 
    'copy-public', 
    'copy-assets', 
    'useref', 
    'rev-hash' , 
    'rev-replace',
    'min',
    'css-prefix',
    'clean-rev'
    ]);

