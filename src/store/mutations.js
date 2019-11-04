export default {
  setPlayer: (state, payload) => {
    state.player = payload
  },
  updateFilter: (state, payload) => {
    // remove the filter
    state.filters = state.filters.filter(f => f.name !== payload.name)

    // re-add the filter with the new value
    state.filters.push(payload)
  }
}
