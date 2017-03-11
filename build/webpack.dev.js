/*
 ** 开发阶段用的 webpack
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const visualizer = require('webpack-visualizer-plugin');

const baseWebpackConfig = require('./webpack.base');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true', baseWebpackConfig.entry[name]]
        // baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new visualizer({
            filename: '../page/state.html'
        })
    ]
})