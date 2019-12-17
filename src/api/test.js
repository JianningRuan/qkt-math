import { get, post } from './config'

export const test = {
  // 提交评测
  submit (params) {
    return post('/service/arithmetic/cp/submit', params)
  },
  // 替换主线任务
  changeMajorTask (params) {
    return get('/service/arithmetic/cp/changeMajorTask', params)
  },
  // 获取测评题目
  getExercises (params) {
    return get('/service/arithmetic/cp/getExercises', params)
  }
}
