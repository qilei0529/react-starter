

const fs = require('fs');
const path = require('path');

const mapEntries = function (srcPath) {
  var entriesList = fs.readdirSync( srcPath ).reduce((entries, dir) => {
    const fullDir = path.join( srcPath,  dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync( fullDir ).isDirectory() && fs.existsSync( entry )) {
      // entries[dir] = ['webpack-hot-middleware/client?noInfo=true&reload=true', entry]
      entries[dir] = entry
    }
    return entries;
  }, {})
  return entriesList;
}

exports.mapEntries = mapEntries;