export default {
  setPlayer: (state, payload) => {
    state.player = payload
  },
  setPlayers: (state, payload) => {
    state.players = payload
  },
  updatePlayerStats: (state, payload) => {
    state.players.map(player => {
      player.stats = payload.stats
    })
  }
}
