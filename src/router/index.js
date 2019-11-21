import Vue from 'vue'
import Router from 'vue-router'

// import {Message} from 'element-ui'

const Home = () => import(/* webpackChunkName:'Index' */ '@/pages/home/index')

Vue.use(Router)

const routerObj = new Router({
  mode: 'hash',
  // mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

routerObj.beforeEach((to, from, next) => {
  // console.log(to)
  // to.query.t = new Date().getMilliseconds()
  next()
})

export default routerObj
