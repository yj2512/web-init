import axios from 'axios'
import { Message } from 'element-ui'
// import router from '@/router'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/gdservice/api/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'
}

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true

axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
    // config.headers.ticket = userInfo.user_ticket;
    // config.headers.access_token = userInfo.Access_token;
    return config
  },
  error => {
    return Promise.error(error)
  })

// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  // 断网 或者 请求超时 状态
  console.log(error, 'error')
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      Message.error('请求超时，请检查网络是否连接正常')
    } else {
      // 可以展示断网组件
      Message.error('请求失败，请检查网络是否已连接')
    }
    return
  }

  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    // switch (error.response.status) {
    //   case 401:
    //     break
    //   case 403:
    //     break
    //   case 404:
    //     break
    //   // 其他错误，直接抛出错误提示
    //   default:
    // }
    return Promise.reject(error.response)
  }
})

export default {
  // get 请求
  httpGet ({
    url,
    params = {}
  }) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      }).then((res) => {
        if (!res.data.success) {
          Message({
            showClose: true,
            message: res.data.msg,
            type: 'warning',
            duration: 1500
          })
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // post请求
  httpPost ({
    url,
    data = {},
    params = {}
  }) {
    return new Promise((resolve, reject) => {
      axios({
        url,
        method: 'post',
        // transformRequest: [function (data) {
        //   let ret = ''
        //   for (let it in data) {
        //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //   }
        //   return ret
        // }],
        // 发送的数据
        data,
        // url参数
        params

      }).then(res => {
        if (!res.data.success) {
          Message({
            showClose: true,
            message: res.data.msg,
            type: 'warning',
            duration: 1500
          })
        }

        resolve(res.data)
      })
    })
  }
}
