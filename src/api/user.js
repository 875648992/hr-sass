import axios from '@/utils/request'
export function login(data) {
  return axios({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getInfo(token) {
}

export function logout() {
}
