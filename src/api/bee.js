import { get } from './config'

export const bee = {
  // 小蜜蜂任务
  task (params) {
    return get('/service/arithmetic/bee/task', params)
  },
  // 小蜜蜂日记
  diary (params) {
    return get('/service/arithmetic/bee/diary', params)
  },
  // 小蜜蜂首页
  index (params) {
    return get('/service/arithmetic/bee/index', params)
  },
  // 获取营养值
  getNutrition (params) {
    return get('/service/arithmetic/bee/getNutrition', params)
  }
}
