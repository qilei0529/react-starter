// 
// build.js 发布编译文件
// 


require('shelljs/global');

var path = require('path');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev');

var spinner = ora('building for production...');
	spinner.start();

var assets_path  = path.resolve(__dirname, '../assets')
var public_path  = path.resolve(__dirname, '../public')

// // clear files
rm('-rf', assets_path);

// cp public files
cp('-R' , public_path, assets_path);

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
