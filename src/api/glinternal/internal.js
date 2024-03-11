import request from '@/utils/request'

// 查询对内担保台账列表
export function listInternal(query) {
  return request({
    url: '/glinternal/internal/list',
    method: 'get',
    params: query
  })
}

// 查询对内担保台账详细
export function getInternal(id) {
  return request({
    url: '/glinternal/internal/' + id,
    method: 'get'
  })
}

// 新增对内担保台账
export function addInternal(data) {
  return request({
    url: '/glinternal/internal',
    method: 'post',
    data: data
  })
}

// 修改对内担保台账
export function updateInternal(data) {
  return request({
    url: '/glinternal/internal',
    method: 'put',
    data: data
  })
}

// 删除对内担保台账
export function delInternal(id) {
  return request({
    url: '/glinternal/internal/' + id,
    method: 'delete'
  })
}
