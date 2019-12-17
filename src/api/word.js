import { get, post } from './config'

export const word = {
  // 切换单词书
  changeBook (params) {
    return post('/service/recite/book/changeBook', params)
  },
  // 单词书单词列表
  getWordsListByBook (params) {
    return get('/service/recite/book/getWordsListByBook', params)
  },
  // 单词书详情
  bookDetail (params) {
    return get('/service/recite/book/bookDetail', params)
  },
  // 我的单词书
  getMyBook (params) {
    return get('/service/recite/book/getMyBook', params)
  },
  // 推荐单词书
  recommendBook (params) {
    return get('/service/recite/book/recommendBook', params)
  },
  // 添加单词书
  addBook (params) {
    return post('/service/recite/book/addBook', params)
  },
  // 单词本列表
  getWordsList (params) {
    return get('/service/recite/words/getWordsList', params)
  },
  // 快速复习
  quickReview (params) {
    return get('/service/recite/words/quickReview', params)
  },
  // 修改每天单词数
  changeStudyNum (params) {
    return post('/service/recite/task/changeStudyNum', params)
  },
  // 做题
  exercise (params) {
    return get('/service/recite/task/exercise', params)
  },
  // 做题后提交
  submit (params) {
    return post('service/recite/task/submit', params)
  },
  // submitFinal
  submitFinal (params) {
    return post('/service/recite/task/submitFinal', params)
  },
  // 总复习题目
  finalExercise (params) {
    return get('/service/recite/task/finalExercise', params)
  },
  // 答错显示
  details (params) {
    return get('/service/recite/task/details', params)
  },
  // 首页
  index (params) {
    return get('/service/recite/task/index', params)
  }
}
