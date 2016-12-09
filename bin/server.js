/**
 * webpack 编译文件
 */

'use strict'

process.env.NODE_ENV = 'development';

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpack_config = require('./webpack.dev')
const setupCompiler  = require('./webpack.setup')

const compiler = setupCompiler(webpack_config);

const app = express()

app.use( webpackDevMiddleware(compiler, {
  publicPath: webpack_config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use( webpackHotMiddleware(compiler) )
app.use(express.static( webpack_config.root ))

const port = process.env.PORT || webpack_config.port || 3000
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
