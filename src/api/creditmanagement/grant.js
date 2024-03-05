import request from '@/utils/request'

// 查询授信管理列表
export function listGrant(query) {
  return request({
    url: '/creditmanagement/grant/list',
    method: 'get',
    params: query
  })
}

// 查询授信管理详细
export function getGrant(id) {
  return request({
    url: '/creditmanagement/grant/' + id,
    method: 'get'
  })
}

// 新增授信管理
export function addGrant(data) {
  return request({
    url: '/creditmanagement/grant',
    method: 'post',
    data: data
  })
}

// 修改授信管理
export function updateGrant(data) {
  return request({
    url: '/creditmanagement/grant',
    method: 'put',
    data: data
  })
}

// 删除授信管理
export function delGrant(id) {
  return request({
    url: '/creditmanagement/grant/' + id,
    method: 'delete'
  })
}
