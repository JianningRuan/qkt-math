import { get, post } from './config'

export const label = {
  // 根据标签类型获取标签
  getTag (params) {
    return get('/service/tag/getTag', params)
  },
  // 点赞
  updateLike (params) {
    return post('/service/platform/updateLike', params)
  },
  // 添加评论
  addSummary (params) {
    return post('/service/summary/addSummary', params)
  },
  qcloud (params) {
    return get('/service/lite/qcloud/getQCloudInfo', params)
  },
  qcloudAuth (params) {
    return get('/service/lite/qcloud/getCredential', params)
  }
}
