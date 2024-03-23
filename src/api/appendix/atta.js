import request from '@/utils/request'

// 查询附件表列表
export function listAtta(query) {
  return request({
    url: '/appendix/atta/list',
    method: 'get',
    params: query
  })
}

// 查询附件表详细
export function getAtta(id) {
  return request({
    url: '/appendix/atta/' + id,
    method: 'get'
  })
}

// 新增附件表
export function addAtta(data) {
  return request({
    url: '/appendix/atta',
    method: 'post',
    data: data
  })
}

// 修改附件表
export function updateAtta(data) {
  return request({
    url: '/appendix/atta',
    method: 'put',
    data: data
  })
}

// 删除附件表
export function delAtta(id) {
  return request({
    url: '/appendix/atta/' + id,
    method: 'delete'
  })
}

// 所有种类的表
export function getAttaList() {
  return request({
    url: '/tool/gen/tablename',
    method: 'get'
  })
}