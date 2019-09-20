import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

export default {
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
    const playerStats = {
      aces: Math.floor(Math.random() * 40),
      doubleFaults: Math.floor(Math.random() * 60),
      winners: Math.floor(Math.random() * 50),
      unforcedErrors: Math.floor(Math.random() * 80),
      firstServeReturn: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30],
      secondServeReturn: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30],
      firstServePointsWon: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30],
      secondServePointsWon: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30],
      netPointsWon: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30],
      breakPointsWon: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30) + 30]
    }

    commit('updatePlayerStats', {
      playerId: payload,
      stats: playerStats
    })
  }
}
