import { FILTERS } from '@/utils/constants'

export function filterTeams (teams, filters) {
  let teamsFiltered = teams

  const filterFormat = filters.find(filter => filter.name === FILTERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      teamsFiltered = teams.filter(team => team.players.every(player => player.gender === 'm'))
    } else if (filterFormat.value === 'women') {
      teamsFiltered = teams.filter(team => team.players.every(player => player.gender === 'f'))
    }
  }

  // TODO: date filter logic

  return teamsFiltered
}

export function filterPlayers (players, filters) {
  let playersFiltered = players

  const filterFormat = filters.find(filter => filter.name === FILTERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      playersFiltered = players.filter(player => player.gender === 'm')
    } else if (filterFormat.value === 'women') {
      playersFiltered = players.filter(player => player.gender === 'f')
    }
  }

  // TODO: date filter logic

  return playersFiltered
}

export function getGenderBorderClass (gender) {
  return { 'border-men': gender === 'm', 'border-women': gender === 'f' }
}

export function getGenderTextClass (gender) {
  return { 'text-men': gender === 'm', 'text-women': gender === 'f' }
}

export function sortPlayers (players, sortBy) {
  if (!sortBy) {
    // default sort order: rank
    sortBy = 'rank'
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
