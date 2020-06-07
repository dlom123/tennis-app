<template>
  <v-container v-if="!isLoading" fluid class="pa-0">

    <v-row
      no-gutters
      :class="{
        'px-2 py-2': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp
      }"
    >
      <v-col>
        <h1>Players</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <ToggleSinglesDoubles class="align-self-end" />
      </v-col>
    </v-row>

    <v-row no-gutters
      :class="{
        'px-2 pt-2': $vuetify.breakpoint.xsOnly,
      }"
    >
    </v-row>

    <v-row no-gutters class="mb-2">
      <v-col
        cols="6"
        md="5" offset-md="3"
        :class="['mb-1', { 'pl-2 mt-3': $vuetify.breakpoint.smAndDown }]"
        class="align-self-end"
      >
        <p class="text-italic mb-0">{{ showingText }}</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="6"
        md="4"
        :class="['align-self-center', { 'pr-2': $vuetify.breakpoint.xsOnly }]"
      >
        <SearchInput placeholder="Player Name" :onChange=onChangeSearch :onClear=onClearSearch />
      </v-col>
    </v-row>

    <v-row
      v-if="screenFilters.length > 0"
      no-gutters
      class="hidden-md-and-up mb-2"
    >
      <v-col
        cols="12"
      >
        <FilterBar :screenFilters="screenFilters" />
      </v-col>
    </v-row>

    <v-row no-gutters>

      <v-col
        class="hidden-sm-and-down"
        md="3"
      >
        <FilterBar :screenFilters="screenFilters" />
      </v-col>

      <v-col
        v-if="playersSorted.length > 0"
        cols="12"
        md="9"
        :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
      >
        <PlayerRow
          v-for="player in playersSorted"
          :key="player.id"
          :player="player"
          type="singles"
        />
      </v-col>
      <v-col
        v-else
        cols="12"
        md="9"
      >
        <EmptyRow text="No players to show." />
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import PlayerRow from '@/components/PlayerRow'
import SearchInput from '@/components/SearchInput'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { FILTERS } from '@/utils/constants'
import { filterPlayers, getShowingText, sortPlayers } from '@/utils/functions'

export default {
  name: 'players',
  components: {
    EmptyRow,
    FilterBar,
    PlayerRow,
    SearchInput,
    ToggleSinglesDoubles
  },
  data() {
    return {
      screenFilters: [FILTERS.GENDER, FILTERS.RATING]
    }
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'players'
    ]),
    showingText() {
      return getShowingText(this.playersSorted.length, this.players.length)
    },
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
    ]),
    async onChangeSearch(value) {
      await this.getPlayers({
        search: value
      })
    },
    async onClearSearch() {
      await this.getPlayers()
    }
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
