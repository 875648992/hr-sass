import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(function(config) {
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
  return Promise.reject(error)
})

export default service
