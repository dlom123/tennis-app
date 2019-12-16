export default {
  getFilterValue: (state) => (filterData) => {
    const f = state.filters.find(f => f.screen === filterData.screen && f.name === filterData.name)

    return f ? f.value : null
  }
}
