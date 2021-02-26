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
