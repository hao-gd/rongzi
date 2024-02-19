import request from '@/utils/request'

// 查询审核项目列表
export function listList(query) {
  return request({
    url: '/rzauditlist/list/list',
    method: 'get',
    params: query
  })
}

// 查询审核项目详细
export function getList(id) {
  return request({
    url: '/rzauditlist/list/' + id,
    method: 'get'
  })
}

// 新增审核项目
export function addList(data) {
  return request({
    url: '/rzauditlist/list',
    method: 'post',
    data: data
  })
}

// 修改审核项目
export function updateList(data) {
  return request({
    url: '/rzauditlist/list',
    method: 'put',
    data: data
  })
}

// 删除审核项目
export function delList(id) {
  return request({
    url: '/rzauditlist/list/' + id,
    method: 'delete'
  })
}
