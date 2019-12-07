export default {
  getFilterValueByName: (state) => (filterName) => {
    const f = state.filters.find(f => f.name === filterName)

    return f ? f.value : null
  }
}
