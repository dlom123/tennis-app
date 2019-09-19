export default {
  getPlayers: async ({ commit }) => {
    const players = [
      { id: 1, firstName: 'Doug', lastName: 'Brown', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 2, firstName: 'Andrea', lastName: 'Burkhardt', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 3, firstName: 'Kourtney', lastName: 'Cogdill', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 4, firstName: 'Alex', lastName: 'Fohl', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 5, firstName: 'Chris', lastName: 'Layton', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 6, firstName: 'Maddie', lastName: 'Lee', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 7, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 8, firstName: 'Dax', lastName: 'Lowery', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 9, firstName: 'Lisa', lastName: 'Martin', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 10, firstName: 'Kessa', lastName: 'McNaught', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 11, firstName: 'Stephanie', lastName: 'Smith', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 12, firstName: 'Dan', lastName: 'Somers', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 13, firstName: 'Heidi', lastName: 'Somers', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 14, firstName: 'David', lastName: 'Strom', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 15, firstName: 'Sara', lastName: 'Tokoly', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 16, firstName: 'Ed', lastName: 'Ventura', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 17, firstName: 'Elise', lastName: 'Vestal', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 18, firstName: 'Emily', lastName: 'Wandel', gender: 'w', ranking: '', img: '', stats: {} },
      { id: 19, firstName: 'Brandon', lastName: 'Wiley', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 20, firstName: 'Tony', lastName: 'Winkler', gender: 'm', ranking: '', img: '', stats: {} },
      { id: 21, firstName: 'Erin', lastName: 'Wolski', gender: 'w', ranking: '', img: '', stats: {} }
    ]

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
