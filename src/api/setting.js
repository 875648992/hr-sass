import axios from '@/utils/request'

export function getAllRole(page = '', pagesize = '') {
  return axios({
    method: 'get',
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}

export function addRole(data) {
  return axios({
    method: 'POST',
    url: '/sys/role',
    data
  })
}

export function delRole(id) {
  return axios({
    method: 'DELETE',
    url: '/sys/role/' + id
  })
}

export function updateRole(data) {
  return axios({
    method: 'PUT',
    url: '/sys/role/' + data.id,
    data
  })
}

export function getCurrentRole(id) {
  return axios({
    method: 'get',
    url: '/sys/role/' + id
  })
}

export function getCompany(id) {
  return axios({
    method: 'GET',
    url: '/company/' + id
  })
}
