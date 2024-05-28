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

// 还款计划（未来12个月查询展示接口）
export function getRepaymentPlanData(query) {
  return request({
    url: '/huankuanjihua/mingxi/paymentSummary',
    method: 'get',
    params: query
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

// 本月还款计划
export function getRepaymentPlan(query) {
  return request({
    url: `/huankuanjihua/mingxi/financialSummaryByMonth/${query}`,
    method: 'get',
  })
}

// 本月还款计划按天查询,传 日期查询 查询范围  =日期当月 且 <=日期当天
export function getRepaymentPlanByDate(query) {
  return request({
    url: `/huankuanjihua/mingxi/financialSummaryByDate/${query}`,
    method: 'get',
  })
}

// 下月还款计划
export function getNextRepaymentPlan(query) {
  return request({
    url: `/huankuanjihua/mingxi/paymentSummaryByMonth/${query}`,
    method: 'get',
  })
}