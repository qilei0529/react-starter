/*
 ** webpack 基础
 */

const webpack = require('webpack');

const config = require('./config');
const utils = require('./utils');
const assign = require('object-assign');

// 动态生成 目录下的 entries ( src/[name]/ 下含有 app.js 的情况下生成 对应的 [name].js)
const project_entries = utils.mapEntries(config.build.assetsSrcRoot);

// 自定义 entries
const custom_entries = config.entries || [];

console.log("Entries:");
const entries = Object.assign({}, project_entries, custom_entries);
console.log( entries );
console.log();

// 自动 alias
const project_alias = utils.mapAlias(config.build.assetsSrcRoot);
const custom_alias = config.alias || [];
const alias = Object.assign({} , project_alias, custom_alias)
console.log( alias )
console.log();

// 生成对应的 [name].css
const extractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new extractTextPlugin('css/[name].css');


module.exports = {
  entry: entries,
  port: config.server.port,
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: config.build.assetsPublicPath
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.styl$/,
      loader: extractCSS.extract(['css', 'stylus'])
    }, {
      test: /\.less$/,
      loader: extractCSS.extract(['css', 'less'])
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 1000,
        name: 'images/[name].[hash:10].[ext]'
      }
    }]
  },

  babel: {
    presets: ['stage-0', 'es2015', 'react']
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  
  resolve: {
    alias: alias
  },

  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        minChunks: 2,
    }),
    new webpack.DefinePlugin( config.defines )
  ]

}