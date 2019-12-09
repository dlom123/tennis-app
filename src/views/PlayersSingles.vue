<template>
  <v-container fluid class="container-main">
    <v-row no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">
          <v-col cols="12">
            <h1>Players : Singles</h1>
          </v-col>
        </v-row>

        <FilterBarPlayers/>

        <PlayerRow
          v-for="(player, i) in playersSorted"
          :key="player.id"
          :player="player"
          :ranking="i + 1"
          type="singles"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import FilterBarPlayers from '@/components/filters/FilterBarPlayers'
import PlayerRow from '@/components/PlayerRow'
import { filterPlayers, sortPlayers } from '@/utils/functions'

export default {
  name: 'players',
  components: {
    FilterBarPlayers,
    PlayerRow
  },
  computed: {
    ...mapState([
      'filters',
      'players',
      'sort'
    ]),
    playersSorted () {
      // apply filters
      const playersFiltered = filterPlayers(this.players, this.filters)

      // apply sorting
      const playersSorted = sortPlayers(playersFiltered, this.sort)

      return playersSorted
    }
  },
  methods: {
    ...mapActions([
      'getPlayers'
    ]),
    ...mapMutations([
      'removeAllFilters'
    ])
  },
  created () {
    this.getPlayers()
  }
}
</script>
