import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: [],
    player: {},
    players: [
      { id: 1, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', avatarUrl: '' },
      { id: 2, firstName: 'Dax', lastName: 'Lowery', gender: 'm', avatarUrl: '' }
    ]
  },
  actions,
  getters,
  mutations
})
