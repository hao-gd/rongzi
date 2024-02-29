import request from '@/utils/request'

// 查询内部借款列表
export function listBorrowing(query) {
  return request({
    url: '/rzinternalborrowing/borrowing/list',
    method: 'get',
    params: query
  })
}

// 查询内部借款详细
export function getBorrowing(id) {
  return request({
    url: '/rzinternalborrowing/borrowing/' + id,
    method: 'get'
  })
}

// 新增内部借款
export function addBorrowing(data) {
  return request({
    url: '/rzinternalborrowing/borrowing',
    method: 'post',
    data: data
  })
}

// 修改内部借款
export function updateBorrowing(data) {
  return request({
    url: '/rzinternalborrowing/borrowing',
    method: 'put',
    data: data
  })
}

// 删除内部借款
export function delBorrowing(id) {
  return request({
    url: '/rzinternalborrowing/borrowing/' + id,
    method: 'delete'
  })
}
