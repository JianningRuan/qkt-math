const SET_WORD_TAB = 'SET_WORD_TAB'
const SET_CN_WORD_TAB = 'SET_CN_WORD_TAB'
const mutations = {
  [SET_WORD_TAB] (state, wordTab) {
    state.wordTab = wordTab
  },
  [SET_CN_WORD_TAB] (state, cnWordTab) {
    state.cnWordTab = cnWordTab
  }
}

export default mutations
