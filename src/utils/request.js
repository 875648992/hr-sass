import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTime } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

function logout() {
  store.dispatch('user/logout')
  router.push('/login')
}

// 请求拦截器
service.interceptors.request.use(function(config) {
  if (store.getters.token) {
    const time = getTime()
    if (Date.now() - time >= 1000 * 60 * 60 * 2) {
      logout()
      Message.success('身份认证过期,请重新登录')
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, function(error) {
  if (error.response.data.code === 10002) {
    logout()
  }
  return Promise.reject(error)
})

export default service
