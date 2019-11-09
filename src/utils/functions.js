import { FILTERS } from '@/utils/constants'

export function filterPlayersSingles (players, filters) {
  let playersFiltered = players

  const filterFormat = filters.find(filter => filter.name === FILTERS.PLAYERS.FORMAT)
  if (filterFormat) {
    if (filterFormat.value === 'men') {
      playersFiltered = players.filter(player => player.gender === 'm')
    } else if (filterFormat.value === 'women') {
      playersFiltered = players.filter(player => player.gender === 'f')
    }
  }

  return playersFiltered
}

export function getGenderTextClass (gender) {
  return { textMen: gender === 'm', textWomen: gender === 'f' }
}

export function sortPlayersSingles (players, sortBy) {
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
