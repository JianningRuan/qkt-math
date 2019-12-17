import { get } from './config'
export const micro = {
  // 微课详情
  getWkDetail (params) {
    return get('/service/wk/getWkDetail', params)
  }
}
