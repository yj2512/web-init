1、说明

  (1) 样式重置reset.scss会影响组件库, 可能会造成组件库样式混乱

  (2) scss的安装 (不需要webpack的配置)
      npm install node-sass --save-dev
      npm install sass-loader --save-dev

  (3) scss使用变量, 需要配置build/utils.js;

  (4) babel将 ES6 代码转为 ES5 代码, 默认只转换新的 JavaScript 句法，而不转换新的 API;
      兼容IE需要babel-polyfill, webpack配置build/webpack.base.conf.js

2、插件

  (1) 文件下载  FileSaver.js
      https://github.com/eligrey/FileSaver.js

  (2) 图标  echarts 
      https://www.echartsjs.com/zh/index.html
