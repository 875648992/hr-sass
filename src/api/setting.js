import request from '@/utils/request'

export function getRole(page = '', pagesize = '') {
  return request({
    url: '/sys/role',
    method: 'get',
    params: {
      page,
      pagesize
    }
  })
}
