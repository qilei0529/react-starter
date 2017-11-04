# React Starter

快速 搭建 react 环境

    - 支持 es6
    - 重载，热加载
    - stylus less

    npm i

    npm run dev

    http://localhost:4000


打包

	npm run build

	npm run build:clean
	npm run build:webpack
	npm run build:gulp


To do list
	
    - 可拆分包文件，动态触发加载
    - eslint
    - redux router 引入


====

## 更新日志

11月5日 
    升级 了一下 package.json 里的 babel-preset-env


4月2日 
    更新 alias 调用规则， 使用 @ 做为前缀防止引用混淆。
    增加 stylus 引用 alias 内容： 使用方法: ~@template ，具体见 → stylus-loader 


3月11日
    增加 包引用 监控 wabpack-visualizer-plugin
    可以 查看 自己的项目文件都引用了哪些包，包内容的占比，方便优化代码
    运行的时候 查看 ./page/state.html

3月3日 
    增加 动态 alias
