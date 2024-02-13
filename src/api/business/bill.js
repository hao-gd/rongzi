import request from '@/utils/request'

// 查询商业承兑汇票列表
export function listBill(query) {
  return request({
    url: '/business/bill/list',
    method: 'get',
    params: query
  })
}

// 查询商业承兑汇票详细
export function getBill(id) {
  return request({
    url: '/business/bill/' + id,
    method: 'get'
  })
}

// 新增商业承兑汇票
export function addBill(data) {
  return request({
    url: '/business/bill',
    method: 'post',
    data: data
  })
}

// 修改商业承兑汇票
export function updateBill(data) {
  return request({
    url: '/business/bill',
    method: 'put',
    data: data
  })
}

// 删除商业承兑汇票
export function delBill(id) {
  return request({
    url: '/business/bill/' + id,
    method: 'delete'
  })
}
