/*
 ** 开发环境 方法库
 */

const fs = require('fs');
const path = require('path');

const mapEntries = function(srcPath) {
  var entriesList = fs.readdirSync(srcPath).reduce((entries, dir) => {
    const fullDir = path.join(srcPath, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
    }
    return entries;
  }, {})
  return entriesList;
}


const mapAlias = function( srcPath ){
  var aliasList = fs.readdirSync(srcPath).reduce((alias, dir) => {
    const fullDir = path.join(srcPath, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      alias[ '~' + dir] = fullDir
    }
    return alias;
  }, {})
  return aliasList;
}

exports.mapEntries = mapEntries;
exports.mapAlias = mapAlias;