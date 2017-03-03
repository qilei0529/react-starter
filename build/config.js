/*
 ** 配置文件
 */

const path = require('path');

const now = new Date()
const PAGE_TIME = now.getTime();

module.exports = {
    // 默认 动态生成 目录下的 entries ( src/[name]/ 下含有 app.js 的情况下生成 对应的 [name].js)
    // 
    entries: {
        // test: './src/meal/app.js'
    },

    server: {
        staticRoot: path.resolve(__dirname, '../'),
        port: 4000
    },

    build: {
        assetsRoot: path.resolve(__dirname, '../assets'),
        assetsSrcRoot: path.resolve(__dirname, '../src'),
        assetsPublicPath:'/assets/',
    },

    alias : {
      '~base':  path.join(__dirname, '../src/base')
    },

    // 全局引用
    defines : {
        // 基础 URL 地址, 根据环境变量加载不同的配置文件
        // ENV_BASE_URL: JSON.stringify( path.resolve(__dirname ,"../src/base/config/" , (process.env.NODE_ENV || "dev")) ),
    },

    // 打包的时候需要替换的内容
    patterns: {
        dev: [
        ],
        daily: [
        ],
        pre: [
        ],
        publish: [
        ]
    },

}