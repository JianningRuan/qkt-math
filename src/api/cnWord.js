import { get, post } from './config'

export const cnWord = {
  // 切换教材
  changeTextbook (params) {
    return post('/service/recognize/book/changeTextbook', params)
  },
  // 我的教材
  getMyTextbook (params) {
    return get('/service/recognize/book/getMyTextbook', params)
  },
  // 推荐教材
  recommendTextbook (params) {
    return get('/service/recognize/book/recommendTextbook', params)
  },
  // 教材下的单词
  getWordsListByTextbook (params) {
    return get('/service/recognize/book/getWordsListByTextbook', params)
  },
  // 教材详情
  textbookDetail (params) {
    return get('/service/recognize/book/textbookDetail', params)
  },
  // 添加教材
  addTextbook (params) {
    return post('/service/recognize/book/addTextbook', params)
  },
  // 快速复习出题
  quickReview (params) {
    return get('/service/recognize/wrongWords/quickReview', params)
  },
  // 快速复习提交
  submitReview (params) {
    return post('/service/recognize/wrongWords/submitReview', params)
  },
  // 错词本列表
  getWrongWordsList (params) {
    return get('/service/recognize/wrongWords/getWrongWordsList', params)
  },
  // 做题
  submit (params) {
    return post('/service/recognize/task/submit', params)
  },
  // 出题
  exercise (params) {
    return get('/service/recognize/task/exercise', params)
  },
  // 总复习提交
  submitFinal (params) {
    return post('/service/recognize/task/submitFinal', params)
  },
  // 总复习题目
  finalExercise (params) {
    return get('/service/recognize/task/finalExercise', params)
  },
  // 答错显示
  details (params) {
    return get('/service/recognize/task/details', params)
  },
  // 首页
  index (params) {
    return get('/service/recognize/task/index', params)
  }
}
