import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as getters from '@/store/getters'
import api from '@/api'

import task from '@/store/task/index'
import topic from '@/store/topic/index'
import video from '@/store/video/index'
import word from '@/store/word/index'

import { removeToken } from '@/utils/auth'

Vue.use(Vuex)

const SET_INDEX_TAB = 'SET_INDEX_TAB'
const SET_TOKEN = 'SET_TOKEN'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_TEST_STATUS = 'SET_TEST_STATUS'
const SET_PRACTICE_TAB = 'SET_PRACTICE_TAB'
const SET_FIND_TAB = 'SET_FIND_TAB'

export default new Vuex.Store({
  state: {
    indexTab: 0,
    token: '',
    userInfo: {},
    testStatus: false, // 本次登录期间，如果用户评测状态status为false，当前没进入过测评页面时为false，已进入过一次为true。目的在于首页检查状态时是否强制跳转到测试页
    practiceTab: 0,
    findTab: 0
  },
  getters,
  mutations: {
    [SET_INDEX_TAB] (state, indexTab) {
      state.indexTab = indexTab
    },
    [SET_TOKEN] (state, token) {
      state.token = token
    },
    [SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [SET_TEST_STATUS] (state, testStatus) {
      state.testStatus = testStatus
    },
    [SET_PRACTICE_TAB] (state, practiceTab) {
      state.practiceTab = practiceTab
    },
    [SET_FIND_TAB] (state, findTab) {
      state.findTab = findTab
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 如果需要判断用户信息不全就进入个人信息填充页面，则换成以下代码，permission.js中的路由守卫也要进行对应的信息空缺判断及跳转
        axios.all([
          api.my.getMyInfo(),
          api.my.getSetting()
        ]).then(axios.spread((myInfo, settingInfo) => {
          if (myInfo.rcode === 300 && settingInfo.rcode === 300) {
            const userInfo = Object.assign({}, myInfo.data, settingInfo.data)
            commit('SET_USER_INFO', userInfo)
            resolve(userInfo)
          } else {
            resolve('')
          }
        })).catch(error => {
          reject(error)
        })
        /* api.my.getMyInfo().then(res => {
          if (res.rcode === 300) {
            commit('SET_USER_INFO', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        }) */
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_INFO', {})
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  modules: {
    task,
    topic,
    video,
    word
  }
})
