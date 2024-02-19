import request from '@/utils/request'

// 查询贷后管理列表
export function listLoan(query) {
  return request({
    url: '/rzafterloan/loan/list',
    method: 'get',
    params: query
  })
}

// 查询贷后管理详细
export function getLoan(id) {
  return request({
    url: '/rzafterloan/loan/' + id,
    method: 'get'
  })
}

// 新增贷后管理
export function addLoan(data) {
  return request({
    url: '/rzafterloan/loan',
    method: 'post',
    data: data
  })
}

// 修改贷后管理
export function updateLoan(data) {
  return request({
    url: '/rzafterloan/loan',
    method: 'put',
    data: data
  })
}

// 删除贷后管理
export function delLoan(id) {
  return request({
    url: '/rzafterloan/loan/' + id,
    method: 'delete'
  })
}
