const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = path.join( __dirname , '../');
const SRC_PATH  = path.join( ROOT_PATH ,  'src');

const extractCSS = new extractTextPlugin( 'css/[name].css');

const entries = fs.readdirSync( SRC_PATH ).reduce((entries, dir) => {
    const fullDir = path.join( SRC_PATH,  dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync( fullDir ).isDirectory() && fs.existsSync( entry )) {
      entries[dir] = ['webpack-hot-middleware/client?noInfo=true&reload=true', entry]
      // entries[dir] = entry
    }
    return entries;
  }, {});

module.exports = {

  root : ROOT_PATH,
  port : 4000,

  devtool: 'inline-source-map',

  entry: entries,

  output: {
    path: path.join( ROOT_PATH , 'assets'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/assets/'
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
          limit: 4000,
          name: 'images/[name].[hash:6].[ext]'
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
    extractCSS,
    // new webpack.optimize.CommonsChunkPlugin("commons", "js/commons.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

}
