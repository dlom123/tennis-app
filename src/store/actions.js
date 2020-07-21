import axios from 'axios'
import router from '@/router'
import leaderboardData from '@/data/leaderboard.json'
import locationsData from '@/data/locations.json'
import playersData from '@/data/players.json'
import { FILTERS } from '@/utils/constants'
import {
  calculateMatchWinsDoubles,
  calculateMatchWinsSingles,
  calculateTiebreakerWinsDoubles,
  calculateTiebreakerWinsSingles,
  calculateSetsPlayedDoubles,
  calculateSetsPlayedSingles,
  calculateGamesPlayed,
  sortStat
} from '@/utils/functions'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

export default {
  getLeaderboard: async ({ commit, state }, payload) => {
    const leaderboard = []

    // get all player ids
    const response = await HTTP.get(`/players`)
    const players = response.data.data.players

    // get Match Win Percentage for each player
    const statMatchWinPercentage = {
      name: 'Match Win %',
      doubles: { players: [] },
      singles: { players: [] }
    }

    const statTiebreakerWinPercentage = {
      name: 'Tiebreaker Win %',
      doubles: { players: [] },
      singles: { players: [] }
    }

    const statSetsPlayed = {
      name: 'Sets Played',
      doubles: { players: [] },
      singles: { players: [] }
    }

    const statGamesPlayed = {
      name: 'Games Played',
      doubles: { players: [] },
      singles: { players: [] }
    }

    // compile all of the data
    for (const player of players) {
      const playerMatchesResponse = await HTTP.get(`/players/${player.id}/matches`)
      const playerMatches = playerMatchesResponse.data.data
      const playerMatchesDoubles = calculateMatchWinsDoubles(playerMatches.doubles, player.id)
      const playerMatchesSingles = calculateMatchWinsSingles(playerMatches.singles, player.id)
      const playerTiebreakersDoubles = calculateTiebreakerWinsDoubles(playerMatches.doubles, player.id)
      const playerTiebreakersSingles = calculateTiebreakerWinsSingles(playerMatches.singles, player.id)
      const playerSetsPlayedDoubles = calculateSetsPlayedDoubles(playerMatches.doubles, player.id)
      const playerSetsPlayedSingles = calculateSetsPlayedSingles(playerMatches.singles, player.id)
      const playerGamesPlayedDoubles = calculateGamesPlayed(playerMatches.doubles)
      const playerGamesPlayedSingles = calculateGamesPlayed(playerMatches.singles)

      const playerData = {
        firstName: player.firstName,
        lastName: player.lastName,
        gender: player.gender
      }

      statMatchWinPercentage.doubles.players.push({ player: playerData, ...playerMatchesDoubles })
      statMatchWinPercentage.singles.players.push({ player: playerData, ...playerMatchesSingles })
      statTiebreakerWinPercentage.doubles.players.push({ player: playerData, ...playerTiebreakersDoubles })
      statTiebreakerWinPercentage.singles.players.push({ player: playerData, ...playerTiebreakersSingles })
      statSetsPlayed.doubles.players.push({ player: playerData, total: playerSetsPlayedDoubles })
      statSetsPlayed.singles.players.push({ player: playerData, total: playerSetsPlayedSingles })
      statGamesPlayed.doubles.players.push({ player: playerData, total: playerGamesPlayedDoubles })
      statGamesPlayed.singles.players.push({ player: playerData, total: playerGamesPlayedSingles })
    }

    leaderboard.push(statMatchWinPercentage)
    leaderboard.push(statTiebreakerWinPercentage)
    leaderboard.push(statSetsPlayed)
    leaderboard.push(statGamesPlayed)

    const leaderboardFiltered = leaderboard.map(stat => {
      const filterGender = state.filters.find(filter => filter.screen === 'leaderboard' && filter.name === FILTERS.GENDER)
      if (filterGender) {
        switch (filterGender.value) {
          case 'male':
            stat.doubles.players = stat.doubles.players.filter(player => player.player.gender === 'm')
            stat.singles.players = stat.singles.players.filter(player => player.player.gender === 'm')
            break
          case 'female':
            stat.doubles.players = stat.doubles.players.filter(player => player.player.gender === 'f')
            stat.singles.players = stat.singles.players.filter(player => player.player.gender === 'f')
            break
        }
      }

      return stat
    })

    // sort the filtered list of players for each stat
    const leaderboardSorted = leaderboardFiltered.map(stat => {
      const doublesSorted = sortStat(stat.doubles, payload.search)
      const singlesSorted = sortStat(stat.singles, payload.search)
      return {
        name: stat.name,
        doubles: doublesSorted,
        singles: singlesSorted
      }
    })

    // truncate the full list of players for each stat to just the top 3
    const leaderboardTopThree = leaderboardSorted.map(stat => {
      return {
        name: stat.name,
        doubles: {
          players: stat.doubles.players.slice(0, 3)
        },
        singles: {
          players: stat.singles.players.slice(0, 3)
        }
      }
    })

    commit('setLeaderboard', leaderboardTopThree)
  },
  getLocations: async ({ commit }) => {
    let locations = locationsData
    commit('setLocations', locations)
  },
  getLocationSettings: async ({ commit }, locationId) => {
    console.log('getting location surfaces for ', locationId)
  },
  getLocationSurfaces: async ({ commit }, locationId) => {
    console.log('getting location surfaces for ', locationId)
  },
  getPlayer: async ({ commit }, playerId) => {
    const response = await HTTP.get(`/players/${playerId}`)

    commit('setPlayer', response.data.data.player)
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

      nonzeros.sort((a, b) => ((a.hits / a.of) > (b.hits / b.of)) ? -1 : 1)
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
