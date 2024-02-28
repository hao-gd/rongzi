import request from '@/utils/request'

// 查询政府专项债列表
export function listBonds(query) {
  return request({
    url: '/government/bonds/list',
    method: 'get',
    params: query
  })
}

// 查询政府专项债详细
export function getBonds(id) {
  return request({
    url: '/government/bonds/' + id,
    method: 'get'
  })
}

// 新增政府专项债
export function addBonds(data) {
  return request({
    url: '/government/bonds',
    method: 'post',
    data: data
  })
}

// 修改政府专项债
export function updateBonds(data) {
  return request({
    url: '/government/bonds',
    method: 'put',
    data: data
  })
}

// 删除政府专项债
export function delBonds(id) {
  return request({
    url: '/government/bonds/' + id,
    method: 'delete'
  })
}
