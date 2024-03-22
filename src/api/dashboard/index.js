import request from '@/utils/request'

// 融资快报头部 Card 数据
export function getCardData() {
  return request({
    url: '/creditmanagement/grant/summary',
    method: 'get'
  })
}