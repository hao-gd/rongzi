import request from '@/utils/request'

// 查询融资项目列表
export function listProject(query) {
  return request({
    url: '/financingproject/project/list',
    method: 'get',
    params: query
  })
}

// 查询融资项目详细
export function getProject(id) {
  return request({
    url: '/financingproject/project/' + id,
    method: 'get'
  })
}

// 新增融资项目
export function addProject(data) {
  return request({
    url: '/financingproject/project',
    method: 'post',
    data: data
  })
}

// 修改融资项目
export function updateProject(data) {
  return request({
    url: '/financingproject/project',
    method: 'put',
    data: data
  })
}

// 删除融资项目
export function delProject(id) {
  return request({
    url: '/financingproject/project/' + id,
    method: 'delete'
  })
}


// 获取还款计划展示数据
export function getRepaymentPlan(query) {
  return request({
    url: '/huankuanjihua/mingxi/all',
    method: 'get',
    params: query
  })
}