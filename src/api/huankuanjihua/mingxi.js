import request from '@/utils/request'

// 查询还款计划明细列表
export function listMingxi(query) {
  return request({
    url: '/huankuanjihua/mingxi/list',
    method: 'get',
    params: query
  })
}

// 查询还款计划明细详细
export function getMingxi(id) {
  return request({
    url: '/huankuanjihua/mingxi/' + id,
    method: 'get'
  })
}

// 新增还款计划明细
export function addMingxi(data) {
  return request({
    url: '/huankuanjihua/mingxi',
    method: 'post',
    data: data
  })
}

// 修改还款计划明细
export function updateMingxi(data) {
  return request({
    url: '/huankuanjihua/mingxi',
    method: 'put',
    data: data
  })
}

// 删除还款计划明细
export function delMingxi(id) {
  return request({
    url: '/huankuanjihua/mingxi/' + id,
    method: 'delete'
  })
}
