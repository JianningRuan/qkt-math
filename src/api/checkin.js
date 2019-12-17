import { get } from './config'

export const checkIn = {
  // 学习时长统计
  getLearningTime (params) {
    return get('/service/nineteenqkt/signed/getLearningTime', params)
  },
  // 签到页信息
  getSignInInfo (params) {
    return get('/service/nineteenqkt/signed/getSignInInfo', params)
  }
}
