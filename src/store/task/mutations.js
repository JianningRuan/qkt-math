const SET_TASK_TAB = 'SET_TASK_TAB'
const SET_CURRENT_TASK_USER_ID = 'SET_CURRENT_TASK_USER_ID'
const mutations = {
  [SET_TASK_TAB] (state, taskTab) {
    state.taskTab = taskTab
  },
  [SET_CURRENT_TASK_USER_ID] (state, currentTaskUserId) {
    state.currentTaskUserId = currentTaskUserId
  }
}

export default mutations
