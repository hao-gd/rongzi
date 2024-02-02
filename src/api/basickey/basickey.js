import request from '@/utils/request'

// 查询基本数据名称列表
export function listBasickey(query) {
  return request({
    url: '/basickey/basickey/list',
    method: 'get',
    params: query
  })
}

// 查询基本数据名称详细
export function getBasickey(basicDataId) {
  return request({
    url: '/basickey/basickey/' + basicDataId,
    method: 'get'
  })
}

// 新增基本数据名称
export function addBasickey(data) {
  return request({
    url: '/basickey/basickey',
    method: 'post',
    data: data
  })
}

// 修改基本数据名称
export function updateBasickey(data) {
  return request({
    url: '/basickey/basickey',
    method: 'put',
    data: data
  })
}

// 删除基本数据名称
export function delBasickey(basicDataId) {
  return request({
    url: '/basickey/basickey/' + basicDataId,
    method: 'delete'
  })
}
