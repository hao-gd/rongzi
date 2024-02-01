import request from '@/utils/request'

// 查询红人列表
export function listInfo(query) {
  return request({
    url: '/influencer/info/list',
    method: 'get',
    params: query
  })
}

// 查询红人详细
export function getInfo(id) {
  return request({
    url: '/influencer/info/' + id,
    method: 'get'
  })
}

// 新增红人
export function addInfo(data) {
  return request({
    url: '/influencer/info',
    method: 'post',
    data: data
  })
}

// 修改红人
export function updateInfo(data) {
  return request({
    url: '/influencer/info',
    method: 'put',
    data: data
  })
}

// 删除红人
export function delInfo(id) {
  return request({
    url: '/influencer/info/' + id,
    method: 'delete'
  })
}
