import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from './../utils/auth'
import qs from 'qs'
import { Toast, Dialog } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_APIURL
})

service.interceptors.request.use(
  config => {
    if (getToken()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['access_token'] = getToken()
    }
    return config
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.config && response.config.responseType === 'blob') {
      return response
    }
    if (response.config && response.config.responseType === 'arraybuffer') {
      return response
    }
    const updateVideoBrowse = response.config.url.indexOf('/service/platform/updateVideoBrowse')
    if (res.rcode !== 300) {
      if (res.rcode === 405) {
        Dialog.alert({
          title: '温馨提示',
          message: '登录信息已过期，请重新登录',
          confirmButtonText: '重新登录'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            router.push({
              path: '/login'
            })
          })
        })
      } else if (res.rcode === 400 || res.rcode === 404) {
        Toast(res.message)
      } else if (updateVideoBrowse < 0) {
        Toast('系统错误，请稍后再试')
      }
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.log(error.response)
    let response = error.response
    const updateVideoBrowse = response.config.url.indexOf('/service/platform/updateVideoBrowse')
    if (response.status === 405) {
      Dialog.alert({
        message: '登录信息已过期，请重新登录',
        title: '温馨提示',
        confirmButtonText: '重新登录'
      }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          router.push({
            name: 'login'
          })
        })
      })
    } else if (updateVideoBrowse >= 0) {

    } else {
      Toast('系统错误，请稍后再试')
    }
    return Promise.reject(new Error(error))
  }
)
export default axios

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    /* if (store.getters.token) {
      if (params) {
        params.access_token = getToken();
      } else {
        params = {
          access_token: getToken()
        }
      }
    } */
    service.get(url, { params: params }).then((response) => {
      resolve(response) // .data
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, ContentType) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { headers: {
      'Content-Type': ContentType || 'application/json; charset=UTF-8'
    }
    }).then(response => {
      resolve(response) // .data
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装post表单提交
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postForm (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(data), { headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // ;charset=UTF-8
    } }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装post文件上传请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postFile (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, { headers: {
      'Content-Type': 'multipart/form-data'
    }
    }).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}

export function getDown (url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, { params: params, responseType: 'blob' }).then((response) => {
      resolve(response) // .data
    }).catch((err) => {
      reject(err)
    })
  })
}

export function postDown (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      responseType: 'blob'
    }).then((response) => {
      resolve(response) // .data
    }).catch((err) => {
      reject(err)
    })
  })
}
