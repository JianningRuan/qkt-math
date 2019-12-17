import { get, post } from './config'

export const login = {
  // 发送登陆短信
  send (params) {
    return get('/service/arithmetic/validate/send', params)
  },
  // 图片验证码
  picture (params) {
    return get('/service/arithmetic/validate/picture', params)
  },
  getPicture (params) {
    return process.env.VUE_APP_APIURL + '/service/arithmetic/validate/picture?mobile=' + params
  },
  // 短信登陆接口
  sms (params) {
    return post('/security/sms', params)
  },
  // 是否允许更新
  getUpdateStatus (params) {
    return get('/service/arithmetic/personal/getUpdateStatus', params)
  },
  // 新增修改信息
  updateStu (params) {
    return post('/service/arithmetic/personal/updateStu', params)
  },
  // 获取地区
  area (params) {
    return get('/service/lite/register/area', params)
  },
  // 获取地区学校
  school (params) {
    return get('/service/lite/register/school', params)
  }
}
