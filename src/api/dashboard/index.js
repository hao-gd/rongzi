import request from '@/utils/request'

// 授信金额 Card 数据
export function getCardData() {
  return request({
    url: '/creditmanagement/grant/summary',
    method: 'get'
  })
}

// 融资金额Card 数据
export function getCardData2() {
  return request({
    url: 'creditmanagement/grant/finance/summary',
    method: 'get'
  })
}
// 担保金额 Card 数据
export function getCardData3() {
  return request({
    url: 'creditmanagement/grant/guarantee/summary',
    method: 'get'
  })
}

// 历史融资和担保查询的列表图接口
export function rzloghistoryFinancing(query) {
  return request({
    url: 'rzlog/historyFinancing/summary',
    method: 'get',
    params: query
  })
}


// 统计分析echart
export function getEchartData(query) {
  return request({
    url: 'rzlog/historyGuarantee/summary',
    method: 'get',
    params: query
  })
}
