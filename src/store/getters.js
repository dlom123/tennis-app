export default {
  getFilterByName: (state) => (filterName) => {
    const f = state.filters.find(f => f.name === filterName)

    return f.value
  }
}
