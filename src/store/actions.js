import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

export default {
  getPlayer: async ({ state, commit }, playerId) => {
    const player = await state.players.filter(player => player.id.toString() === playerId)[0]

    commit('setPlayer', player)
  },
  getPlayers: async ({ commit }) => {
    const results = await HTTP.get('/players?isActive=true&sort=lastName')

    const players = results.data.data

    players.forEach(player => {
      let image = player.avatarUrl

      if (!image) {
        // if the player does not have a headshot of their own, grab a random placeholder headshot for the player's gender
        const men = ['anderson', 'berdych', 'dimitrov', 'djokovic', 'federer', 'isner', 'kyrgios', 'mcenroe', 'nadal', 'nishikori', 'raonic', 'simon', 'wawrinka', 'zverev']
        const women = ['azarenka', 'barty', 'bouchard', 'clijsters', 'halep', 'hingis', 'kerber', 'keys', 'muguruza', 'osaka', 'sharapova', 'stephens', 'venus', 'wozniacki']
        let randomPlayer

        if (player.gender === 'm') {
          randomPlayer = men[Math.floor(Math.random() * men.length)]
          image = `placeholders/men/${randomPlayer}.png`
        } else {
          randomPlayer = women[Math.floor(Math.random() * women.length)]
          image = `placeholders/women/${randomPlayer}.png`
        }
      }

      player.avatarUrl = image
      player.stats = {}
    })

    commit('setPlayers', players)
  },
  getStats: async ({ commit }, payload) => {
    const results = await HTTP.get(`/players/${payload.playerId}/stats`)

    const stats = results.data.data

    commit('updatePlayerStats', {
      playerId: payload,
      stats
    })
  }
}
