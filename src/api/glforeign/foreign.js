import request from '@/utils/request'

// 查询对外担保台账列表
export function listForeign(query) {
  return request({
    url: '/glforeign/foreign/list',
    method: 'get',
    params: query
  })
}

// 查询对外担保台账详细
export function getForeign(id) {
  return request({
    url: '/glforeign/foreign/' + id,
    method: 'get'
  })
}

// 新增对外担保台账
export function addForeign(data) {
  return request({
    url: '/glforeign/foreign',
    method: 'post',
    data: data
  })
}

// 修改对外担保台账
export function updateForeign(data) {
  return request({
    url: '/glforeign/foreign',
    method: 'put',
    data: data
  })
}

// 删除对外担保台账
export function delForeign(id) {
  return request({
    url: '/glforeign/foreign/' + id,
    method: 'delete'
  })
}
