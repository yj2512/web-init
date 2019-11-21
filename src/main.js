// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
// element-ui组件库主题样式
import './assets/style/element-variables.scss'
// 引入公共样式
import './assets/style/index.scss'

import httpTool from './tools/httpTool'
Vue.prototype.$httpGet = httpTool.httpGet
Vue.prototype.$httpPost = httpTool.httpPost

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
