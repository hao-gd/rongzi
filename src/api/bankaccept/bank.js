import request from '@/utils/request'

// 查询银行承兑汇票列表
export function listBank(query) {
  return request({
    url: '/bankaccept/bank/list',
    method: 'get',
    params: query
  })
}

// 查询银行承兑汇票详细
export function getBank(id) {
  return request({
    url: '/bankaccept/bank/' + id,
    method: 'get'
  })
}

// 新增银行承兑汇票
export function addBank(data) {
  return request({
    url: '/bankaccept/bank',
    method: 'post',
    data: data
  })
}

// 修改银行承兑汇票
export function updateBank(data) {
  return request({
    url: '/bankaccept/bank',
    method: 'put',
    data: data
  })
}

// 删除银行承兑汇票
export function delBank(id) {
  return request({
    url: '/bankaccept/bank/' + id,
    method: 'delete'
  })
}
