import { FILTERS } from '@/utils/constants'

export function calculateGamesPlayed(matches) {
  // calculate how many total games have been played by
  // the given player id for the given matches
  let totalGames = 0
  matches.forEach(match => {
    match.sets.forEach(set => {
      totalGames += set.score
    })
  })

  return totalGames
}

export function calculateMatchWinsDoubles(matches, playerId) {
  // calculate how many of the given matches were won by the given player id's team
  let playerTeamId = 0
  let totalMatchesPlayed = 0
  let totalMatchesWon = 0
  matches.forEach(match => {
    totalMatchesPlayed++
    // get the team id that the player was a part of for this match
    for (let i = 0; i < match.sets.length; i++) {
      const thisSet = match.sets[i]
      for (let j = 0; j < thisSet.team.players.length; j++) {
        const thisPlayer = thisSet.team.players[j]
        if (thisPlayer.id === Number(playerId)) {
          playerTeamId = thisSet.team.id
          // found it...we can stop looking now
          break
        }
      }
      if (playerTeamId !== 0) {
        // no, really...we got it...no need to iterate any further
        break
      }
    }

    // calculate the winner of the match
    const winnerTeamId = getMatchWinnerDoubles(match)

    // check if the player's team won the match
    if (Number(winnerTeamId) === playerTeamId) {
      totalMatchesWon++
    }
  })

  return {
    won: totalMatchesWon,
    of: totalMatchesPlayed
  }
}

export function calculateMatchWinsSingles(matches, playerId) {
  // calculate how many of the given matches were won by the given player id
  let totalMatchesPlayed = 0
  let totalMatchesWon = 0
  matches.forEach(match => {
    totalMatchesPlayed++
    const winnerPlayerId = getMatchWinnerSingles(match)
    if (Number(winnerPlayerId) === Number(playerId)) {
      totalMatchesWon++
    }
  })

  return {
    won: totalMatchesWon,
    of: totalMatchesPlayed
  }
}

export function calculateSetsPlayedDoubles(matches, playerId) {
  // calculate how many total sets have been played by
  // the given player id for the given doubles matches
  let totalSets = 0
  matches.forEach(match => {
    match.sets.forEach(set => {
      set.team.players.forEach(player => {
        if (player.player.id === Number(playerId)) {
          totalSets++
        }
      })
    })
  })

  return totalSets
}

export function calculateSetsPlayedSingles(matches, playerId) {
  // calculate how many total sets have been played by
  // the given player id for the given singles matches
  let totalSets = 0
  matches.forEach(match => {
    match.sets.forEach(set => {
      if (set.player.id === Number(playerId)) {
        totalSets++
      }
    })
  })

  return totalSets
}

export function filterPlayers(players, filters) {
  let playersFiltered = [...players]

  // filter: gender
  const filterGender = filters.find(filter => filter.screen === 'players' && filter.name === FILTERS.GENDER)
  if (filterGender) {
    if (filterGender.value === 'male') {
      playersFiltered = playersFiltered.filter(player => player.gender === 'm')
    } else if (filterGender.value === 'female') {
      playersFiltered = playersFiltered.filter(player => player.gender === 'f')
    }
  }

  // filter: rating
  const filterRating = filters.find(filter => filter.screen === 'players' && filter.name === FILTERS.RATING)
  if (filterRating) {
    playersFiltered = playersFiltered.filter(player => player.rating === filterRating.value)
  }

  return playersFiltered
}

export function filterStatLeaders(leaders, filters) {
  let leadersFiltered = [...leaders]

  if (filters && filters.length) {
    // filter: gender (shares filter state with Leaderboard screen)
    const filterGender = filters.find(filter => filter.screen === 'leaderboard' && filter.name === FILTERS.GENDER)
    if (filterGender) {
      if (filterGender.value === 'male') {
        leadersFiltered = leaders.filter(player => player.player.gender === 'm')
      } else if (filterGender.value === 'female') {
        leadersFiltered = leaders.filter(player => player.player.gender === 'f')
      }
    }
  }

  return leadersFiltered
}

export function filterTeams(teams, filters) {
  let teamsFiltered = [...teams]

  // filter: format
  const filterFormat = filters.find(filter => filter.screen === 'teams' && filter.name === FILTERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      teamsFiltered = teamsFiltered.filter(team => team.players.every(player => player.gender === 'm'))
    } else if (filterFormat.value === 'women') {
      teamsFiltered = teamsFiltered.filter(team => team.players.every(player => player.gender === 'f'))
    } else if (filterFormat.value === 'mixed') {
      teamsFiltered = teamsFiltered.filter(team => team.players.find(player => player.gender === 'm') && team.players.find(player => player.gender === 'f'))
    }
  }

  // filter: rating
  const filterRating = filters.find(filter => filter.screen === 'teams' && filter.name === FILTERS.RATING)
  if (filterRating) {
    teamsFiltered = teamsFiltered.filter(team => {
      let combinedRating = 0.0
      team.players.forEach(player => {
        combinedRating += Number(player.rating)
      })

      return combinedRating.toFixed(1) === filterRating.value
    })
  }

  return teamsFiltered
}

export function getDisplayGender(gender) {
  return gender === 'm' ? 'male' : 'female'
}

export function getGenderBorderClass(gender) {
  return { 'border-men': gender === 'm', 'border-women': gender === 'f' }
}

export function getGenderTextClass(gender) {
  return { 'text-men': gender === 'm', 'text-women': gender === 'f' }
}

export function getMatchWinnerDoubles(match) {
  /* Returns the id of the team that won the match */
  const teams = {}

  // build a sequential data structure of each team's set scores for each match
  /*
    teams = {
      <teamId>: {
          games: [2, 6],
          tiebreaker_points: [0, 7]
        }
    }
  */
  match.sets.forEach(set => {
    if (!teams.hasOwnProperty(set.team.id)) {
      teams[set.team.id] = {
        games: [set.score],
        tiebreakerPoints: [set.tiebreakerScore]
      }
    } else {
      teams[set.team.id].games.splice(set.seq, 0, set.score)
      teams[set.team.id].tiebreakerPoints.splice(set.seq, 0, set.tiebreakerScore)
    }
  })

  // calculate who won the match
  let winnerValue = 0 // used as a +/- tally to decide which playerId has won the match
  const teamIds = Object.keys(teams)
  const teamOne = teams[teamIds[0]]
  const teamTwo = teams[teamIds[1]]
  // games array length will always be the same beween players
  for (let i = 0; i < teamOne.games.length; i++) {
    // tiebreaker score will be the first decider
    if (teamOne.tiebreakerPoints[i] !== null) {
      // this set was decided by a tiebreaker
      if (teamOne.tiebreakerPoints[i] > teamTwo.tiebreakerPoints[i]) {
        winnerValue--
      } else if (teamTwo.tiebreakerPoints[i] > teamOne.tiebreakerPoints[i]) {
        winnerValue++
      }
    } else {
      // this set was not decided by a tiebreaker
      if (teamOne.games[i] > teamTwo.games[i]) {
        winnerValue--
      } else if (teamTwo.games[i] > teamOne.games[i]) {
        winnerValue++
      }
    }
  }

  // return the winning player id based on which way the +/- tally landed
  // - this should never be 0 for a real match (no draws)
  if (winnerValue < 0) {
    return teamIds[0]
  } else if (winnerValue > 0) {
    return teamIds[1]
  }
}

export function getMatchWinnerSingles(match) {
  /* Returns the id of the player that won the match */
  const players = {}

  // build a sequential data structure of each player's set scores for each match
  /*
    players = {
      <playerId>: {
          games: [2, 6],
          tiebreaker_points: [0, 7]
        }
    }
  */
  match.sets.forEach(set => {
    if (!players.hasOwnProperty(set.player.id)) {
      players[set.player.id] = {
        games: [set.score],
        tiebreakerPoints: [set.tiebreakerScore]
      }
    } else {
      players[set.player.id].games.splice(set.seq, 0, set.score)
      players[set.player.id].tiebreakerPoints.splice(set.seq, 0, set.tiebreakerScore)
    }
  })

  // calculate who won the match
  let winnerValue = 0 // used as a +/- tally to decide which playerId has won the match
  const playerIds = Object.keys(players)
  const playerOne = players[playerIds[0]]
  const playerTwo = players[playerIds[1]]
  // games array length will always be the same beween players
  for (let i = 0; i < playerOne.games.length; i++) {
    // tiebreaker score will be the first decider
    if (playerOne.tiebreakerPoints[i] !== null) {
      // this set was decided by a tiebreaker
      if (playerOne.tiebreakerPoints[i] > playerTwo.tiebreakerPoints[i]) {
        winnerValue--
      } else if (playerTwo.tiebreakerPoints[i] > playerOne.tiebreakerPoints[i]) {
        winnerValue++
      }
    } else {
      // this set was not decided by a tiebreaker
      if (playerOne.games[i] > playerTwo.games[i]) {
        winnerValue--
      } else if (playerTwo.games[i] > playerOne.games[i]) {
        winnerValue++
      }
    }
  }

  // return the winning player id based on which way the +/- tally landed
  // - this should never be 0 for a real match (no draws)
  if (winnerValue < 0) {
    return playerIds[0]
  } else if (winnerValue > 0) {
    return playerIds[1]
  }
}

export function getPercentage(num, denom) {
  // return integer percentage, rounded to the nearest whole number, without a decimal
  return Math.round(num / denom * 100)
}

export function getPrecisionPercentage(num, denom) {
  // return floating point percentage, with all decimal numbers preserved
  return ((num / denom) * 100)
}

export function sortPlayers(players, sortBy) {
  if (!sortBy) {
    // default sort order: name
    sortBy = 'name'
  }

  if (sortBy === 'name') {
    // sort alphabetically by last name, then first name
    players.sort((a, b) => (a.lastName > b.lastName)
      ? 1
      : (a.lastName === b.lastName)
        ? ((a.firstName > b.firstName) ? 1 : -1)
        : -1
    )
  }

  return players
}

export function sortTeams(teams) {
  // sort the players within each team by last name, first name alphabetically
  teams.forEach(team => {
    team.players.sort((a, b) => (a.lastName > b.lastName)
      ? 1
      : (a.lastName === b.lastName)
        ? ((a.firstName > b.firstName) ? 1 : -1)
        : -1
    )
  })

  // sort the teams alphabetically based on the last name, first name of the first player of each team
  teams.sort((a, b) => (a.players[0].lastName > b.players[0].lastName)
    ? 1
    : (a.players[0].lastName === b.players[0].lastName)
      ? ((a.players[0].firstName > b.players[0].firstName) ? 1 : -1)
      : -1
  )

  return teams
}

function inchesToCentimeters(inches) {
  return Math.floor(inches * 2.54)
}

export function translateHeight(totalInches) {
  const feet = Math.floor(totalInches / 12)
  const inches = Math.floor(totalInches % 12)
  const cm = inchesToCentimeters(totalInches)
  return `${feet}'${inches}" (${cm} cm)`
}
