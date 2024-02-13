import request from '@/utils/request'

// 查询反向保理列表
export function listFactoring(query) {
  return request({
    url: '/reverse/factoring/list',
    method: 'get',
    params: query
  })
}

// 查询反向保理详细
export function getFactoring(id) {
  return request({
    url: '/reverse/factoring/' + id,
    method: 'get'
  })
}

// 新增反向保理
export function addFactoring(data) {
  return request({
    url: '/reverse/factoring',
    method: 'post',
    data: data
  })
}

// 修改反向保理
export function updateFactoring(data) {
  return request({
    url: '/reverse/factoring',
    method: 'put',
    data: data
  })
}

// 删除反向保理
export function delFactoring(id) {
  return request({
    url: '/reverse/factoring/' + id,
    method: 'delete'
  })
}
