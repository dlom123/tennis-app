import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    filters: [],
    leaderboard: [],
    player: {},
    players: [],
    sort: undefined,
    stat: {},
    team: [],
    teams: []
  },
  actions,
  getters,
  mutations
})
