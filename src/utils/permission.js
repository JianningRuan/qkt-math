import router from '@/router'
import store from '@/store'
import { getToken, removeToken, setToken } from './auth'
import { Toast } from 'vant'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  let userInfoArr = Object.keys(store.state.userInfo) // 判断{}是否为空
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else if (userInfoArr.length > 0 && to.path === '/personalData') {
      next()
    } else { // 先判断是否已存在用户信息
      if (to.query.access_token) {
        setToken(to.query.access_token)
      }
      if (userInfoArr.length === 0) { // 如果用户信息为空
        // 实时拉取用户的信息
        store.dispatch('GetUserInfo').then(res => {
          console.log(res)
          if (res === '') {
            next()
          } else if (res.grade === null || res.grade === undefined) {
            next({
              path: '/personalData'
            })
          } else {
            next()
          }
          // next()
        }).catch(() => {
          Toast({
            message: '您的登录信息已过期，请重新登录！',
            position: 'bottom',
            duration: 5000
          })
          removeToken()
          next({
            path: '/login'
          })
        })
      } else {
        if (store.state.userInfo.grade === null || store.state.userInfo.grade === undefined) {
          next({
            path: '/personalData'
          })
        } else {
          next()
        }
        // next()
      }
    }
  } else {
    if (to.query.access_token) {
      setToken(to.query.access_token)
      // 实时拉取用户的信息
      store.dispatch('GetUserInfo').then(res => {
        // 如果需要判断用户信息不全就进入个人信息填充页面，则换成以下代码
        if (res.grade === null || res.grade === undefined) {
          next({
            path: '/personalData'
          })
        } else {
          next()
        }
        // next()
      }).catch(() => {
        Toast({
          message: '您的登录信息已过期，请重新登录！',
          position: 'bottom',
          duration: 5000
        })
        removeToken()
      })
    }
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
