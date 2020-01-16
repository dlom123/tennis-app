import { FILTERS } from '@/utils/constants'

export function filterPlayers(players, filters) {
  let playersFiltered = [...players]

  // filter: format
  const filterFormat = filters.find(filter => filter.screen === 'players' && filter.name === FILTERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      playersFiltered = playersFiltered.filter(player => player.gender === 'm')
    } else if (filterFormat.value === 'women') {
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
    // filter: format
    const filterFormat = filters.find(filter => filter.screen === 'stat' && filter.name === FILTERS.FORMAT)
    if (filterFormat) {
      if (filterFormat.value === 'men') {
        leadersFiltered = leaders.filter(player => player.player.gender === 'm')
      } else if (filterFormat.value === 'women') {
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

export function getGenderBorderClass(gender) {
  return { 'border-men': gender === 'm', 'border-women': gender === 'f' }
}

export function getGenderTextClass(gender) {
  return { 'text-men': gender === 'm', 'text-women': gender === 'f' }
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
