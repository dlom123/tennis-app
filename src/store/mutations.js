export default {
  setCurrentPlayer: (state, payload) => {
    state.currentPlayer = payload
  },
  setPlayers: (state, payload) => {
    state.players = payload
  },
  setShowPlayerDialog: (state, payload) => {
    state.showPlayerDialog = payload
  },
  updatePlayerStats: (state, payload) => {
    state.players.map(player => {
      player.stats = payload.stats
    })
  }
}
