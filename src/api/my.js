import { get, post } from './config'

export const my = {
  // 提交意见
  suggestion (params) {
    return post('/service/arithmetic/personal/suggestion', params)
  },
  // 设置页面
  getSetting (params) {
    return get('/service/lite/student/getSetting', params)
  },
  // 获取资料
  getMyInfo (params) {
    return get('/service/nineteenqkt/personal/getMyInfo', params)
  },
  // 消息列表
  getMessageList (params) {
    return get('/service/nineteenqkt/personal/getMessageList', params)
  },
  // 消息详情
  getMessageInfo (params) {
    return get('/service/nineteenqkt/personal/getMessageInfo', params)
  },
  // 错题本
  getWrongInfo (params) {
    return get('/service/nineteenqkt/personal/getWrongInfo', params)
  },
  // 获取可以切换的学生
  getStudentList (params) {
    return get('/service/lite/student/getStudentList', params)
  },
  // 切换角色
  change (params) {
    return post('/security/change', params)
  }
}
