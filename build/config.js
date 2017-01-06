
const path = require('path');

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, '../assets'),
        assetsSrcRoot: path.resolve(__dirname, '../src'),
        assetsPublicPath:'/assets/',
    },

    dev: {
        staticRoot: path.resolve(__dirname, '../'),
        port: 3000
    }
}