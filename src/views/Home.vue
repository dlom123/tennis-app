<template>
  <v-container fluid>

    <PlayersFilterBar/>

    <template v-if="!isFilterDoubles">
      <PlayerRowSingles
        v-for="(player, i) in playersSorted"
        :key="player.id"
        :player="player"
        :ranking="i + 1"
      />
    </template>

    <template v-else>
      <PlayerRowDoubles
        v-for="(team, i) in teamsSorted"
        :key="team.id"
        :team="team"
        :ranking="i + 1"
      />
    </template>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlayersFilterBar from '@/components/PlayersFilterBar.vue'
import PlayerRowDoubles from '@/components/PlayerRowDoubles.vue'
import PlayerRowSingles from '@/components/PlayerRowSingles.vue'
import { FILTERS } from '@/utils/constants'
import { filterTeams, filterPlayers, sortPlayers } from '@/utils/functions'

export default {
  name: 'home',
  components: {
    PlayerRowDoubles,
    PlayerRowSingles,
    PlayersFilterBar
  },
  computed: {
    ...mapState([
      'filters',
      'players',
      'sort',
      'teams'
    ]),
    isFilterDoubles () {
      return this.filters.find(f => f.name === FILTERS.PLAYERS.TYPE && f.value === 'doubles')
    },
    playersSorted () {
      // apply filters
      const playersFiltered = filterPlayers(this.players, this.filters)

      // apply sorting
      const playersSorted = sortPlayers(playersFiltered, this.sort)

      return playersSorted
    },
    teamsSorted () {
      // apply filters
      const teamsFiltered = filterTeams(this.teams, this.filters)

      return teamsFiltered
    }
  },
  methods: {
    ...mapActions([
      'getPlayers',
      'getTeams'
    ])
  },
  created () {
    this.getPlayers()
    this.getTeams()
  }
}
</script>
