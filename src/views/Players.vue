<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">

          <v-col>
            <h1>Players</h1>
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <ToggleSinglesDoubles />
          </v-col>

        </v-row>

        <FilterBar />

        <template v-if="playersSorted.length">
          <PlayerRow
            v-for="player in playersSorted"
            :key="player.id"
            :player="player"
            type="singles"
          />
        </template>
        <template v-else>
          <EmptyRow text="No players to show." />
        </template>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import PlayerRow from '@/components/PlayerRow'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { filterPlayers, sortPlayers } from '@/utils/functions'

export default {
  name: 'players',
  components: {
    EmptyRow,
    FilterBar,
    PlayerRow,
    Spinner,
    ToggleSinglesDoubles
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'players'
    ]),
    playersSorted() {
      // apply filters
      const playersFiltered = filterPlayers(this.players, this.filters)

      // apply sorting
      const playersSorted = sortPlayers(playersFiltered)

      return playersSorted
    }
  },
  methods: {
    ...mapActions([
      'getPlayers'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setPlayers'
    ])
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['players'])

    this.setLoading(true)
    await this.getPlayers()
    this.setLoading(false)
  },
  destroyed() {
    this.setPlayers([])
  }
}
</script>

<style scoped lang="sass">
.container-main
  height: 100%
  background-color: #eee
  .row-title
    margin: 10px 0 15px 0
</style>
