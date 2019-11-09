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
import { filterPlayersSingles, sortPlayersSingles } from '@/utils/functions'

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
      const playersFiltered = filterPlayersSingles(this.players, this.filters)

      // apply sorting
      const playersSorted = sortPlayersSingles(playersFiltered, this.sort)

      return playersSorted
    },
    teamsSorted () {
      return this.teams
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
