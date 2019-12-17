const SET_REPLY_PAGE = 'SET_REPLY_PAGE'
const SET_REPLY_ID = 'SET_REPLY_ID'
const mutations = {
  [SET_REPLY_PAGE] (state, replyPage) {
    state.replyPage = replyPage
  },
  [SET_REPLY_ID] (state, replyId) {
    state.replyId = replyId
  }
}
export default mutations
