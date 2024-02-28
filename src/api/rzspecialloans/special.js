import request from '@/utils/request'

// 查询专项借款列表
export function listSpecial(query) {
  return request({
    url: '/rzspecialloans/special/list',
    method: 'get',
    params: query
  })
}

// 查询专项借款详细
export function getSpecial(id) {
  return request({
    url: '/rzspecialloans/special/' + id,
    method: 'get'
  })
}

// 新增专项借款
export function addSpecial(data) {
  return request({
    url: '/rzspecialloans/special',
    method: 'post',
    data: data
  })
}

// 修改专项借款
export function updateSpecial(data) {
  return request({
    url: '/rzspecialloans/special',
    method: 'put',
    data: data
  })
}

// 删除专项借款
export function delSpecial(id) {
  return request({
    url: '/rzspecialloans/special/' + id,
    method: 'delete'
  })
}
