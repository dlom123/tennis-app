<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
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
import { mapActions, mapMutations, mapState } from 'vuex'
import FilterBarPlayers from '@/components/filters/FilterBarPlayers'
import PlayerRow from '@/components/PlayerRow'
import Spinner from '@/components/Spinner'
import { filterPlayers, sortPlayers } from '@/utils/functions'

export default {
  name: 'players',
  components: {
    FilterBarPlayers,
    PlayerRow,
    Spinner
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'players',
      'sort'
    ]),
    playersSorted() {
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
      'removeAllFilters',
      'setLoading',
      'setPlayers'
    ])
  },
  async created() {
    this.setLoading(true)
    await this.getPlayers()
    this.setLoading(false)
  },
  beforeRouteLeave(to, from, next) {
    this.setPlayers([])

    next()
  }
}
</script>
