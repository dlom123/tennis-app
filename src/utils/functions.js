import { FILTERS } from '@/utils/constants'

export function filterPlayers(players, filters) {
  let playersFiltered = players

  const filterFormat = filters.find(filter => filter.name === FILTERS.PLAYERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      playersFiltered = players.filter(player => player.gender === 'm')
    } else if (filterFormat.value === 'women') {
      playersFiltered = players.filter(player => player.gender === 'f')
    }
  }

  // TODO: year filter logic

  return playersFiltered
}

export function filterTeams(teams, filters) {
  let teamsFiltered = teams

  const filterFormat = filters.find(filter => filter.name === FILTERS.TEAMS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      teamsFiltered = teams.filter(team => team.players.every(player => player.gender === 'm'))
    } else if (filterFormat.value === 'women') {
      teamsFiltered = teams.filter(team => team.players.every(player => player.gender === 'f'))
    } else if (filterFormat.value === 'mixed') {
      teamsFiltered = teams.filter(team => team.players.find(player => player.gender === 'm') && team.players.find(player => player.gender === 'f'))
    }
  }

  // TODO: year filter logic

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
  } else if (sortBy === 'rank') {
    // sort by ranking points descending
    players.sort((a, b) => (a.points < b.points) ? 1 : -1)
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
