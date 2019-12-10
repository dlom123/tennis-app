import axios from 'axios'
import leaderboardData from '@/data/leaderboard.json'
import playersData from '@/data/players.json'
import { FILTERS } from '@/utils/constants'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

export default {
  getLeaderboard: async ({ commit }, payload) => {
    // TODO: get leaderboard data from the API
    // const results = await HTTP.get('/leaderboard')
    const leaderboard = leaderboardData

    commit('setLeaderboard', leaderboard)
  },
  getLeaderboardTopThree: async ({ commit }, payload) => {
    // TODO: get leaderboard data from the API
    // const results = await HTTP.get('/leaderboard')
    const leaderboard = leaderboardData.map(stat => {
      if (stat.players.every(player => player.total)) {
        // integer-based stat
        stat.players.sort((a, b) => (a.total < b.total) ? 1 : -1)
      } else if (stat.players.every(player => player.in && player.of)) {
        // percentage-based stat
        stat.players.sort((a, b) => ((a.in / a.of) < (b.in / b.of) ? 1 : -1))
      }

      return stat
    })

    const topThree = leaderboard.map(stat => {
      return {
        ...stat,
        players: stat.players.slice(0, 3)
      }
    })

    return topThree
  },
  getPlayer: async ({ commit }, playerId) => {
    // TODO: get player data from the API
    // const results = await HTTP.get('/player/1')
    const players = playersData.singles
    const player = await players.filter(player => player.id.toString() === playerId.toString())[0]

    commit('setPlayer', player)
  },
  getPlayers: async ({ commit }) => {
    // TODO: get player data from the API
    // const results = await HTTP.get('/players?isActive=true&sort=lastName')
    const players = playersData.singles

    commit('setPlayers', players)
  },
  getPlayerStats: async ({ commit }, payload) => {
    const results = await HTTP.get(`/players/${payload.playerId}/stats`)

    const stats = results.data.data

    commit('updatePlayerStats', {
      playerId: payload,
      stats
    })
  },
  getTeam: async ({ state, commit }, teamId) => {
    const team = await state.teams.filter(team => team.id.toString() === teamId.toString())[0]

    commit('setTeam', team)
  },
  getTeams: async ({ commit }, payload) => {
    // TODO: get team data from the API
    const teams = playersData.doubles

    commit('setTeams', teams)
  },
  removePlayerFilters: ({ commit }) => {
    Object.values(FILTERS.PLAYER).forEach(filter => {
      commit('removeFilter', filter)
    })
  }
}
