import { get, post } from './config'

export const task = {
  // 任务出题
  getTaskExercises (params) {
    return get('/service/arithmetic/task/getTaskExercises', params)
  },
  // 任务详情
  getTaskDetail (params) {
    return get('/service/arithmetic/task/getTaskDetail', params)
  },
  // 全部任务
  getAllTask (params) {
    return get('/service/arithmetic/task/getAllTask', params)
  },
  // 我的任务记录
  getMyTask (params) {
    return get('/service/arithmetic/task/getMyTask', params)
  },
  // 添加任务
  addTask (params) {
    return post('/service/arithmetic/task/addTask', params)
  },
  // 移除非主线任务
  delTask (params) {
    return post('/service/arithmetic/task/delTask', params)
  },
  // 统计任务答题结果
  checkTaskAnswer (params) {
    return post('/service/arithmetic/task/checkTaskAnswer', params)
  }
}
