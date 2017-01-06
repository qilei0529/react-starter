
const webpack = require('webpack')

const config = require('./config')
const utils = require('./utils')

const assetsPublicPath = process.env.NODE_ENV === 'production' ? 
    config.build.assetsPublicPath : 
    config.dev.assetsPublicPath

const entries = utils.mapEntries( config.build.assetsSrcRoot )


const extractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new extractTextPlugin( 'css/[name].css')


module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: config.build.assetsPublicPath
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.styl$/, 
        loader: extractCSS.extract(['css','stylus'])
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 1000,
          name: 'images/[name].[hash:5].[ext]'
        }
      }
    ]
  },

  babel: {
      presets: ['stage-0','es2015','react']
  },
  
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    extractCSS
  ]

}
