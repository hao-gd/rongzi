import request from '@/utils/request'

// 查询基本数据详情列表
export function listDataInfo(query) {
  return request({
    url: '/basicData/dataInfo/list',
    method: 'get',
    params: query
  })
}

// 查询基本数据详情详细
export function getDataInfo(childDataId) {
  return request({
    url: '/basicData/dataInfo/' + childDataId,
    method: 'get'
  })
}

// 新增基本数据详情
export function addDataInfo(data) {
  return request({
    url: '/basicData/dataInfo',
    method: 'post',
    data: data
  })
}

// 修改基本数据详情
export function updateDataInfo(data) {
  return request({
    url: '/basicData/dataInfo',
    method: 'put',
    data: data
  })
}

// 删除基本数据详情
export function delDataInfo(childDataId) {
  return request({
    url: '/basicData/dataInfo/' + childDataId,
    method: 'delete'
  })
}
