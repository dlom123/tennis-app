export default {
  removeFilter: (state, payload) => {
    state.filters = state.filters.filter(f => f.name !== payload)
  },
  setPlayer: (state, payload) => {
    state.player = payload
  },
  setPlayers: (state, payload) => {
    state.players = payload
  },
  setSort: (state, payload) => {
    state.sort = payload
  },
  setTeam: (state, payload) => {
    state.team = payload
  },
  setTeams: (state, payload) => {
    state.teams = payload
  },
  updateFilter: (state, payload) => {
    // remove the filter
    state.filters = state.filters.filter(f => f.name !== payload.name)

    // re-add the filter with the new value
    state.filters.push(payload)
  }
}
