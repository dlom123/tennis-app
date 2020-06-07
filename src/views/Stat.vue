<template>
  <v-container v-if="!isLoading" fluid class="pa-0">

    <v-row
      no-gutters
      :class="{
        'px-2 pt-3': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp
      }"
    >
      <v-col>
        <NavBack text="Back to Leaderboard" routeName="leaderboard" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <ToggleSinglesDoubles />
      </v-col>
    </v-row>

    <v-row no-gutters
      :class="{
        'px-2 pt-2': $vuetify.breakpoint.xsOnly,
      }"
    >
    </v-row>

    <v-row no-gutters class="mb-2 justify-end">
      <v-col
        cols="12"
        sm="6"
        md="4"
        :class="[{ 'px-2': $vuetify.breakpoint.xsOnly }]"
      >
        <SearchInput placeholder="Player Name" :onChange=onChangeSearch :onClear=onClearSearch />
      </v-col>
    </v-row>

    <v-row
      v-if="screenFilters.length > 0"
      no-gutters
      class="hidden-md-and-up mt-4 mb-2"
    >
      <v-col cols="12">
        <FilterBar :screenFilters="screenFilters" screenOverride="leaderboard" />
      </v-col>
    </v-row>

    <v-row no-gutters>

      <v-col class="hidden-sm-and-down" md="3">
        <FilterBar :screenFilters="screenFilters" screenOverride="leaderboard" />
      </v-col>

      <v-col
        v-if="statFiltered.players.length > 0"
        cols="12"
        md="9"
        :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
      >
        <LeaderboardCard :stat="statFiltered" />
      </v-col>
      <v-col v-else cols="12" md="9" class="pa-0">
        <EmptyRow text="Nothing to show." />
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import LeaderboardCard from '@/components/LeaderboardCard'
import NavBack from '@/components/NavBack'
import SearchInput from '@/components/SearchInput'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { FILTERS } from '@/utils/constants'
import { filterStatLeaders } from '@/utils/functions'

export default {
  name: 'stat',
  components: {
    EmptyRow,
    FilterBar,
    LeaderboardCard,
    NavBack,
    SearchInput,
    ToggleSinglesDoubles
  },
  data() {
    return {
      screenFilters: [FILTERS.GENDER]
    }
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'stat'
    ]),
    statFiltered() {
      // apply filters
      const filteredPlayers = filterStatLeaders(this.stat.players, this.filters)
      const statFiltered = {
        ...this.stat,
        players: filteredPlayers
      }

      return statFiltered
    }
  },
  methods: {
    ...mapActions([
      'getStat'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setStat'
    ]),
    async onChangeSearch(value) {
      await this.getStat({
        statId: this.$route.params.statId,
        search: value
      })
    },
    async onClearSearch() {
      await this.getStat({
        statId: this.$route.params.statId
      })
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['stat', 'leaderboard'])

    this.setLoading(true)
    await this.getStat({ statId: this.$route.params.statId })
    this.setLoading(false)
  },
  destroyed() {
    this.setStat({})
  }
}
</script>
