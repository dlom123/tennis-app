<template>
  <v-container fluid>

    <FilterBarPlayers/>

    <PlayerRow
      v-for="(player, i) in playersSorted"
      :key="player.id"
      :player="player"
      :ranking="i + 1"
      type="singles"
    />

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FilterBarPlayers from '@/components/FilterBarPlayers.vue'
import PlayerRow from '@/components/PlayerRow.vue'
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
    ])
  },
  created () {
    this.getPlayers()
  }
}
</script>
