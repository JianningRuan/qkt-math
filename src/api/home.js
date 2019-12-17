import { get } from './config'

export const home = {
  // 口算首页 获取任务列表
  getTasks (params) {
    return get('/service/arithmetic/index/getTasks', params)
  },
  // 检查测评状态
  getStatus (params) {
    return get('/service/arithmetic/cp/getStatus', params)
  },
  // 获取个人信息
  getInfo (params) {
    return get('/service/arithmetic/index/getInfo', params)
  },
  // 获取推荐课程列表
  getRecommendCourse (params) {
    return get('/service/nineteenqkt/index/getRecommendCourse', params)
  },
  // 正在学习
  getMyLearning (params) {
    return get('/service/nineteenqkt/index/getMyLearning', params)
  },
  // 学习资源
  getLearningResources (params) {
    return get('/service/nineteenqkt/index/getLearningResources', params)
  },
  // 获取广告banner
  getBanner (params) {
    return get('/service/lite/banner/getBanner', params)
  }
}
