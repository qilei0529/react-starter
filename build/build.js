/**
 * build.js 发布编译文件
 */

require('shelljs/global');

var path = require('path');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod');

var spinner = ora('building for production...');
    spinner.start();

var assetsPath   = path.resolve(__dirname, '../assets');

// // clear files
rm('-rf', assetsPath);

// run webpack
webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});

