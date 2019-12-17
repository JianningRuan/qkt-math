const SET_VIDEO_PAGE = 'SET_VIDEO_PAGE'
const SET_CURRENT_VIDEO_ID = 'SET_CURRENT_VIDEO_ID'
const SET_VIDEO_TYPE = 'SET_VIDEO_TYPE'
const mutations = {
  [SET_VIDEO_PAGE] (state, videoPage) {
    state.videoPage = videoPage
  },
  [SET_CURRENT_VIDEO_ID] (state, currentVideoId) {
    state.currentVideoId = currentVideoId
  },
  [SET_VIDEO_TYPE] (state, videoType) {
    state.videoType = videoType
  }
}
export default mutations
