import { get, post, postForm } from './config'

export const course = {
  // 口算首页 获取任务列表
  getCourse (params) {
    return get('/service/platform/getCourse', params)
  },
  getCourseList (params) {
    return get('/service/platform/getCourseLesson', params)
  },
  getVideoDetail (params) {
    return get('/service/platform/getVideoDetail', params)
  },
  getAboutLesson (params) {
    return get('/service/platform/getVideoRelevant', params)
  },
  updateVideoBrowse (params) {
    return postForm('/service/platform/updateVideoBrowse', params)
  }
}
