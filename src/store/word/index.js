import state from './state'
import mutations from './mutations'
import * as getters from './getters'

const word = {
  namespaced: true,
  state,
  mutations,
  getters
}

export default word
