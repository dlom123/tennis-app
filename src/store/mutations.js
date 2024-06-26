export default {
  removeAllFiltersByScreen: (state, payload) => {
    state.filters = state.filters.filter(f =>
      f.screen !== payload.screen
    )
  },
  removeAllFiltersExcept: (state, payload) => {
    state.filters = state.filters.filter(f =>
      payload.includes(f.screen)
    )
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
  setLocations: (state, payload) => {
    state.locations = payload
  },
  setMatches: (state, payload) => {
    state.playerMatchesDoubles = payload
  },
  setPlayer: (state, payload) => {
    state.player = payload
  },
  setPlayerMatchesDoubles: (state, payload) => {
    state.playerMatchesDoubles = payload
  },
  setPlayerMatchesSingles: (state, payload) => {
    state.playerMatchesSingles = payload
  },
  setPlayers: (state, payload) => {
    state.players = payload
  },
  setStat: (state, payload) => {
    state.stat = payload
  },
  setTournament: (state, payload) => {
    state.tournament = payload
  },
  setTournamentNav: (state, payload) => {
    state.tournamentNav = payload
  },
  setTournaments: (state, payload) => {
    state.tournaments = payload
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
