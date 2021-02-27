import request from '@/utils/request'

export function getDepart() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
export function delDepart(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

export function addDepart(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

export function queryDepart(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET'
  })
}

export function updateDepart(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
