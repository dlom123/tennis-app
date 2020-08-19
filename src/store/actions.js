import axios from 'axios'
import router from '@/router'
import { FILTERS } from '@/utils/constants'
import {
  compileStat,
  sortStat
} from '@/utils/functions'

let auth = {}

if (process.env.NODE_ENV === 'production') {
  auth.username = process.env.VUE_APP_API_USERNAME
  auth.password = process.env.VUE_APP_API_PASSWORD
}

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
}, {
  auth
})

export default {
  addMatch: async ({ commit }, payload) => {
    try {
      await HTTP.post('/matches', payload)
    } catch (e) {
      console.error(e)
    }
  },
  getLeaderboard: async ({ commit, state }, payload) => {
    try {
      const statsResponse = await HTTP.get('/stats')
      const stats = statsResponse.data.data

      // get all players
      const playersResponse = await HTTP.get(`/players`)
      const players = playersResponse.data.data.players

      // pre-populate an object with each stat's id and name
      let leaderboard = stats.map(stat => ({
        id: stat.id,
        name: stat.name,
        doubles: [],
        singles: []
      }))

      // compile all of the data
      for (const player of players) {
        const playerMatchesResponse = await HTTP.get(`/players/${player.id}/matches`)
        const playerMatches = playerMatchesResponse.data.data

        leaderboard.forEach(stat => {
          const playerStat = compileStat(stat, player, playerMatches)
          if (stat.id === playerStat.statId) {
            stat.doubles.push(playerStat.doubles)
            stat.singles.push(playerStat.singles)
          }
        })
      }

      const leaderboardFiltered = leaderboard.map(stat => {
        const filterGender = state.filters.find(filter => filter.screen === 'leaderboard' && filter.name === FILTERS.GENDER)
        if (filterGender) {
          switch (filterGender.value) {
            case 'male':
              stat.doubles = stat.doubles.filter(player => player.gender === 'm')
              stat.singles = stat.singles.filter(player => player.gender === 'm')
              break
            case 'female':
              stat.doubles = stat.doubles.filter(player => player.gender === 'f')
              stat.singles = stat.singles.filter(player => player.gender === 'f')
              break
          }
        }
        return stat
      })

      // sort the filtered list of players for each stat
      const leaderboardSorted = leaderboardFiltered.map(stat => {
        const doublesSorted = sortStat(stat.doubles, payload.search, false)
        const singlesSorted = sortStat(stat.singles, payload.search, false)

        return {
          ...stat,
          doubles: doublesSorted,
          singles: singlesSorted
        }
      })

      // truncate the full list of players for each stat to just the top 3
      const leaderboardTopThree = leaderboardSorted.map(stat => ({
        ...stat,
        doubles: stat.doubles.slice(0, 3),
        singles: stat.singles.slice(0, 3)
      }))

      commit('setLeaderboard', leaderboardTopThree)
    } catch (e) {
      console.error(e)
    }
  },
  getLocations: async ({ commit }) => {
    // get all locations
    const locationsResponse = await HTTP.get(`/locations`)
    const locations = locationsResponse.data.data

    commit('setLocations', locations)
  },
  getLocationSettings: async ({ commit }, locationId) => {
    console.log('getting location surfaces for ', locationId)
  },
  getLocationSurfaces: async ({ commit }, locationId) => {
    console.log('getting location surfaces for ', locationId)
  },
  getPlayer: async ({ commit }, playerId) => {
    try {
      const response = await HTTP.get(`/players/${playerId}`)

      commit('setPlayer', response.data.data.player)
    } catch (e) {
      router.push({ name: 'players' })
      console.error(e)
    }
  },
  getPlayerMatches: async ({ commit }, payload) => {
    const response = await HTTP.get(`/players/${payload.playerId}/matches`)
    commit('setPlayerMatchesSingles', response.data.data.singles)
    commit('setPlayerMatchesDoubles', response.data.data.doubles)
  },
  getPlayers: async ({ commit }, payload) => {
    try {
      let queryParams = ''
      if (payload && payload.search) {
        queryParams += `?search=${payload.search}`
      }
      const response = await HTTP.get(`/players${queryParams}`)
      const players = response.data.data.players

      commit('setPlayers', players)
    } catch (e) {
      console.error(e)
    }
  },
  getStat: async ({ commit, state }, payload) => {
    const response = await HTTP.get(`/stats/${payload.statId}`)
    const stat = response.data.data

    if (!stat) {
      router.push({ name: 'leaderboard' })
    }

    // get all players
    const playersResponse = await HTTP.get(`/players`)
    const players = playersResponse.data.data.players

    // pre-populate an object with each stat's id and name
    let leaderboard = {
      id: stat.id,
      name: stat.name,
      doubles: [],
      singles: []
    }

    // compile all of the data
    for (const player of players) {
      const playerMatchesResponse = await HTTP.get(`/players/${player.id}/matches`)
      const playerMatches = playerMatchesResponse.data.data

      const playerStat = compileStat(stat, player, playerMatches)
      if (stat.id === playerStat.statId) {
        leaderboard.doubles.push(playerStat.doubles)
        leaderboard.singles.push(playerStat.singles)
      }
    }

    const filterGender = state.filters.find(filter => filter.screen === 'stat' && filter.name === FILTERS.GENDER)
    if (filterGender) {
      switch (filterGender.value) {
        case 'male':
          leaderboard.doubles = leaderboard.doubles.filter(player => player.gender === 'm')
          leaderboard.singles = leaderboard.singles.filter(player => player.gender === 'm')
          break
        case 'female':
          leaderboard.doubles = leaderboard.doubles.filter(player => player.gender === 'f')
          leaderboard.singles = leaderboard.singles.filter(player => player.gender === 'f')
          break
      }
    }

    // sort the filtered list of players for each stat
    const doublesSorted = sortStat(leaderboard.doubles, payload.search)
    const singlesSorted = sortStat(leaderboard.singles, payload.search)
    const leaderboardSorted = {
      ...leaderboard,
      doubles: doublesSorted,
      singles: singlesSorted
    }

    commit('setStat', leaderboardSorted)
  },
  getTournaments: async ({ commit }) => {
    // TODO: get tournaments data from the API
    const tournaments = []

    commit('setTournaments', tournaments)
  }
}
