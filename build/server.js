/**
 * server.js 本地 开发 环境
 */

'use strict'

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const path = require('path');
const opn = require('opn');

const config = require('./config');

const webpackConfig = require('./webpack.dev');
const setupCompiler = require('./webpack.setup');

const compiler = setupCompiler(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = webpackHotMiddleware(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    });
    cb();
  })
})

const app = express();
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(config.server.staticRoot));

const port = config.server.port;
module.exports = app.listen(port, (err) => {

  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port + '/page/template.html'
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }

})