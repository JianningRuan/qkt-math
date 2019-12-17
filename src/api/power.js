import { get } from './config'

export const power = {
  // 个人能力
  info (params) {
    return get('/service/arithmetic/personal/info', params)
  },
  // 知识点报告
  knowledge (params) {
    return get('/service/arithmetic/personal/knowledge', params)
  },
  // 等级说明
  level (params) {
    return get('/service/arithmetic/personal/level', params)
  }
}
