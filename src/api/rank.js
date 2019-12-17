import { get } from './config'

export const rank = {
  // 世界榜
  world (params) {
    return get('/service/arithmetic/rank/world', params)
  },
  // 学校榜
  school (params) {
    return get('/service/arithmetic/rank/school', params)
  },
  // 等级榜
  level (params) {
    return get('/service/arithmetic/rank/level', params)
  }
}
