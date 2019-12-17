import { get, post } from './config'

export const wrong = {
  // 具体错题
  exercises (params) {
    return get('/service/arithmetic/wrong/exercises', params)
  },
  // 强化提交
  submit (params) {
    return post('/service/arithmetic/wrong/submit', params)
  },
  // 强化题目
  strengthen (params) {
    return get('/service/arithmetic/wrong/strengthen', params)
  },
  // 错题本
  book (params) {
    return get('/service/arithmetic/wrong/book', params)
  }
}
