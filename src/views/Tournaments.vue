<template>
  <v-container v-if="!isLoading" fluid class="pa-0">

    <v-row
      no-gutters
      :class="{
        'px-2 pt-2': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp
      }"
    >
      <v-col>
        <h1>Tournaments</h1>
      </v-col>
      <v-spacer></v-spacer>
      <!-- <v-col class="d-flex justify-end">
        <ToggleSinglesDoubles class="align-self-end" />
      </v-col> -->
    </v-row>

    <v-row no-gutters class="mb-2 justify-end">
      <v-col
        cols="12"
        sm="6"
        md="4"
        :class="[{ 'px-2 mt-3': $vuetify.breakpoint.xsOnly }]"
      >
        <SearchInput placeholder="Tournament name" :onChange=onChangeSearch :onClear=onClearSearch />
      </v-col>
    </v-row>

    <!-- <v-row
      v-if="screenFilters.length > 0"
      no-gutters
      class="hidden-md-and-up mt-4 mb-2"
    >
      <v-col cols="12">
        <FilterBar :screenFilters="screenFilters" />
      </v-col>
    </v-row> -->

    <v-row no-gutters>
      <!-- <v-col class="hidden-sm-and-down" md="3">
        <FilterBar :screenFilters="screenFilters" />
      </v-col> -->
    </v-row>

    <v-row no-gutters class="pl-2 my-2">
      <v-col><h2>Upcoming</h2></v-col>
    </v-row>

    <v-row v-if="tournamentsUpcoming.length > 0" no-gutters>
      <v-col
        cols="12"
        md="9"
        :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
      >
        <TournamentCard v-for="(tournament, i) in tournamentsUpcoming" :key="i" :tournament="tournament"
        />
      </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <v-col cols="12" md="9" class="pa-0">
        <EmptyRow text="Nothing to show." />
      </v-col>
    </v-row>

    <v-row no-gutters class="pl-2 my-2">
      <v-col><h2>Past</h2></v-col>
    </v-row>

    <v-row v-if="tournamentsPast.length > 0" no-gutters>
      <v-col
        cols="12"
        md="9"
        :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
      >
        <TournamentCard v-for="(tournament, i) in tournamentsPast" :key="i" :tournament="tournament"
        />
      </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <v-col cols="12" md="9" class="pa-0">
        <EmptyRow text="Nothing to show." />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import moment from 'moment'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import SearchInput from '@/components/SearchInput'
import TournamentCard from '@/components/TournamentCard'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'tournaments',
  components: {
    EmptyRow,
    FilterBar,
    SearchInput,
    TournamentCard
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
      'tournaments',
      'view'
    ]),
    tournamentsUpcoming() {
      return this.tournaments.filter(tournament => moment().isBefore(tournament.date))
    },
    tournamentsPast() {
      return []
    }
  },
  methods: {
    ...mapActions([
      'getTournaments'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading'
    ]),
    async onChangeSearch(value) {
      await this.getTournaments({
        search: value
      })
    },
    async onClearSearch() {
      await this.getTournaments()
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['tournaments'])

    this.setLoading(true)
    await this.getTournaments()
    this.setLoading(false)
  }
}
</script>
