import { post } from './config'

export const until = {
  // 点赞
  updateLike (params) {
    return post('/service/platform/updateLike', params)
  },
  // 更新访问次数（访问记录）
  post_visited (params) {
    return post('/service/base/post_visited', params)
  }
}
