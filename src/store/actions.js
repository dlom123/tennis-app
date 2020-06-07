import axios from 'axios'
import router from '@/router'
import leaderboardData from '@/data/leaderboard.json'
import playersData from '@/data/players.json'
import { FILTERS } from '@/utils/constants'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

export default {
  getLeaderboardTopThree: async ({ commit, state }, payload) => {
    // TODO: get leaderboard data from the API
    // TODO: use filters from state to modify API request
    // const results = await HTTP.get('/leaderboard')
    const leaderboard = JSON.parse(JSON.stringify(leaderboardData))
    const leaderboardFiltered = leaderboard.map(stat => {
      const filterGender = state.filters.find(filter => filter.screen === 'leaderboard' && filter.name === FILTERS.GENDER)
      if (filterGender) {
        switch (filterGender.value) {
          case 'male':
            stat.players = stat.players.filter(player => player.player.gender === 'm')
            break
          case 'female':
            stat.players = stat.players.filter(player => player.player.gender === 'f')
            break
        }
      }

      return stat
    })

    // sort the filtered list of players for each stat
    const leaderboardSorted = leaderboardFiltered.map(stat => {
      // sort by stat rank, descending
      if (stat.players.every(player => player.hasOwnProperty('total'))) {
        // integer-based stat
        stat.players.sort((a, b) => (a.total > b.total) ? -1 : 1)
      } else if (stat.players.every(player => player.hasOwnProperty('in') && player.hasOwnProperty('of'))) {
        // percentage-based stat
        const zeros = stat.players.filter(player => player.of === 0)
        const nonzeros = stat.players.filter(player => player.of > 0)

        nonzeros.sort((a, b) => ((a.in / a.of) > (b.in / b.of)) ? -1 : 1)
        stat.players = [...nonzeros, ...zeros]
      }

      // assign ranking to each pre-sorted player
      for (let i = 0; i < stat.players.length; i++) {
        stat.players[i].rank = i + 1
      }

      if (payload && payload.search) {
        const searchString = payload.search.toLowerCase()
        stat.players = stat.players.filter(player =>
          player.player.firstName.toLowerCase().includes(searchString) ||
          player.player.lastName.toLowerCase().includes(searchString))
      }

      return stat
    })

    // truncate the full list of players for each stat to just the top 3
    const leaderboardTopThree = leaderboardSorted.map(stat => {
      return {
        ...stat,
        players: stat.players.slice(0, 3)
      }
    })

    commit('setLeaderboard', leaderboardTopThree)
  },
  getPlayer: async ({ commit }, playerId) => {
    // TODO: get player data from the API
    // const results = await HTTP.get('/player/1')
    const players = playersData.singles
    const player = await players.filter(player => player.id.toString() === playerId.toString())[0]

    commit('setPlayer', player)
  },
  getPlayers: async ({ commit }, payload) => {
    // TODO: get players data from the API
    // const results = await HTTP.get('/players?isActive=true&sort=lastName')
    let players = playersData.singles
    if (payload && payload.search) {
      const searchString = payload.search.toLowerCase()
      players = players.filter(player => player.firstName.toLowerCase().includes(searchString) ||
                                         player.lastName.toLowerCase().includes(searchString))
    }

    commit('setPlayers', players)
  },
  getPlayerStats: async ({ commit }, payload) => {
    // TODO: get player stats data from the API
    const results = await HTTP.get(`/players/${payload.playerId}/stats`)

    const stats = results.data.data

    commit('updatePlayerStats', {
      playerId: payload,
      stats
    })
  },
  getStat: async ({ commit }, payload) => {
    // TODO: get stat data from the API
    const stat = JSON.parse(JSON.stringify(leaderboardData))
      .find(stat => stat.id === parseInt(payload.statId, 10))

    if (!stat) {
      router.push({ name: 'leaderboard' })
    }

    // sort the list of players by stat rank, descending
    if (stat.players && stat.players.every(player => player.hasOwnProperty('total'))) {
      // integer-based stat
      stat.players.sort((a, b) => (a.total > b.total) ? -1 : 1)
    } else if (stat.players && stat.players.every(player => player.hasOwnProperty('in') &&
                                                            player.hasOwnProperty('of'))) {
      // percentage-based stat
      const zeros = stat.players.filter(player => player.of === 0)
      const nonzeros = stat.players.filter(player => player.of > 0)

      nonzeros.sort((a, b) => ((a.in / a.of) > (b.in / b.of)) ? -1 : 1)
      stat.players = [...nonzeros, ...zeros]
    }

    // assign ranking to each pre-sorted player
    for (let i = 0; i < stat.players.length; i++) {
      stat.players[i].rank = i + 1
    }

    if (payload && payload.search) {
      // filter by search input after rankings have already been established
      const searchString = payload.search.toLowerCase()
      stat.players = stat.players.filter(player =>
        player.player.firstName.toLowerCase().includes(searchString) ||
        player.player.lastName.toLowerCase().includes(searchString))
    }

    commit('setStat', stat)
  },
  getTeam: async ({ commit }, teamId) => {
    // TODO: get team data from the API
    const teams = playersData.doubles
    const team = await teams.filter(team => team.id.toString() === teamId.toString())[0]

    return commit('setTeam', team)
  },
  getTeams: async ({ commit }) => {
    // TODO: get teams data from the API
    const teams = playersData.doubles

    commit('setTeams', teams)
  }
}
