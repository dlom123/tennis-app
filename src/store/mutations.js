export default {
  removeAllFiltersExcept: (state, payload) => {
    state.filters = state.filters.filter(f => {
      return payload.includes(f.screen)
    })
  },
  removeFilter: (state, payload) => {
    state.filters = state.filters.filter(f =>
      f.screen !== payload.screen ||
      (f.screen === payload.screen && f.name !== payload.name)
    )
  },
  setLeaderboard: (state, payload) => {
    state.leaderboard = payload
  },
  setLoading: (state, payload) => {
    state.isLoading = payload
  },
  setPlayer: (state, payload) => {
    state.player = payload
  },
  setPlayers: (state, payload) => {
    state.players = payload
  },
  setStat: (state, payload) => {
    state.stat = payload
  },
  setTeam: (state, payload) => {
    state.team = payload
  },
  setTeams: (state, payload) => {
    state.teams = payload
  },
  setView: (state, payload) => {
    state.view = payload
  },
  updateFilter: (state, payload) => {
    // remove the filter
    state.filters = state.filters.filter(f => !(f.screen === payload.screen && f.name === payload.name))

    // re-add the filter with the new value
    state.filters.push(payload)
  }
}
