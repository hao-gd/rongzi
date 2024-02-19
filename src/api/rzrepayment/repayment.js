import request from '@/utils/request'

// 查询还款计划列表
export function listRepayment(query) {
  return request({
    url: '/rzrepayment/repayment/list',
    method: 'get',
    params: query
  })
}

// 查询还款计划详细
export function getRepayment(id) {
  return request({
    url: '/rzrepayment/repayment/' + id,
    method: 'get'
  })
}

// 新增还款计划
export function addRepayment(data) {
  return request({
    url: '/rzrepayment/repayment',
    method: 'post',
    data: data
  })
}

// 修改还款计划
export function updateRepayment(data) {
  return request({
    url: '/rzrepayment/repayment',
    method: 'put',
    data: data
  })
}

// 删除还款计划
export function delRepayment(id) {
  return request({
    url: '/rzrepayment/repayment/' + id,
    method: 'delete'
  })
}
