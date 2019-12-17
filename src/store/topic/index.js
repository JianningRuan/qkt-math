import state from './state'
import mutations from './mutations'
import * as getters from './getters'

const topic = {
  namespaced: true,
  state,
  mutations,
  getters
}

export default topic
