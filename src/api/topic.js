import { get, post } from './config'

export const topic = {
  // 参与话题
  joinCompusTopic (params) {
    return post('/service/compustopic/joinCompusTopic', params)
  },
  // 最近参与的一条话题
  getLastJoinCompusTopic (params) {
    return get('/service/compustopic/getLastJoinCompusTopic', params)
  },
  // 热门话题列表
  getCompusTopicList (params) {
    return get('/service/compustopic/getCompusTopicList', params)
  },
  // 话题评论列表
  getSummaryList (params) {
    return get('/service/compustopic/getSummaryList', params)
  },
  // 话题详情
  getCompusTopicDetail (params) {
    return get('/service/compustopic/getCompusTopicDetail', params)
  },
  // 回复列表
  getReplyList (params) {
    return get('/service/summary/getReplyList', params)
  }
}
