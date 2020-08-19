import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-tennisstats',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    filters: [],
    isLoading: false,
    leaderboard: {},
    locations: [],
    player: {},
    playerMatchesDoubles: [],
    playerMatchesSingles: [],
    players: [],
    stat: {},
    tournaments: [],
    view: 'singles'
  },
  actions,
  getters,
  mutations
})
