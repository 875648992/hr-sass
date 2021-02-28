import request from '@/utils/request'

export function getEmployee() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

export function getEmployeeList(page = '1', size = '10') {
  return request({
    url: '/sys/user',
    method: 'get',
    params: {
      page,
      size
    }
  })
}

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

