import axios from '@/utils/request'
export function login(data) {
  return axios({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getInfo() {
  return axios({
    method: 'POST',
    url: '/sys/profile'
  })
}

export function logout() {
}
