/*
 ** 打包 测试，发布用的 webpack
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base');

module.exports = merge(baseWebpackConfig, {
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	]
})