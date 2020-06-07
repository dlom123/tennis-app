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
        <h1>Leaderboard</h1>
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
        <FilterBar :screenFilters="screenFilters" />
      </v-col>
    </v-row>

    <v-row no-gutters>

      <v-col class="hidden-sm-and-down" md="3">
        <FilterBar :screenFilters="screenFilters" />
      </v-col>

      <v-col cols="12" md="9" v-if="leaderboard.length > 0">
        <v-row :no-gutters="$vuetify.breakpoint.xsOnly">
          <v-col
            cols="12"
            lg="6"
            v-for="stat in leaderboard"
            :key="stat.name"
            class="py-0"
          >
            <LeaderboardCard
              :stat="stat"
              class="mb-5"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="9" v-else>
        <v-row>
          <v-col
            cols="12"
          >
            <EmptyRow text="Nothing to show." />
          </v-col>
        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import LeaderboardCard from '@/components/LeaderboardCard'
import SearchInput from '@/components/SearchInput'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'leaderboard',
  components: {
    EmptyRow,
    FilterBar,
    LeaderboardCard,
    SearchInput,
    ToggleSinglesDoubles
  },
  data() {
    return {
      screenFilters: [FILTERS.GENDER],
      searchValue: '',
      subMutations: null
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'leaderboard'
    ])
  },
  methods: {
    ...mapActions([
      'getLeaderboardTopThree'
    ]),
    ...mapMutations([
      'removeAllFiltersByScreen',
      'removeAllFiltersExcept',
      'setLeaderboard',
      'setLoading'
    ]),
    async loadData(searchValue) {
      // this.setLoading(true)
      await this.getLeaderboardTopThree({
        search: searchValue
      })
      // this.setLoading(false)
    },
    async onChangeSearch(value) {
      // this.setLoading(true)
      this.searchValue = value
      await this.loadData(value)
      // this.setLoading(false)
    },
    async onClearSearch() {
      this.searchValue = ''
      await this.loadData()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // reset all filters if specified through the router
      if (to.params.clearFilters) {
        vm.removeAllFiltersByScreen({ screen: vm.$route.name })
      }
    })
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['leaderboard'])

    // subscribe to leaderboard filter mutations so we can perform async API calls
    this.subMutations = this.$store.subscribe(async (mutation, state) => {
      if ((mutation.type === 'removeAllFiltersByScreen' && mutation.payload.screen === 'leaderboard') ||
        (mutation.type === 'updateFilter' && mutation.payload.screen === 'leaderboard')
      ) {
        await this.loadData(this.searchValue)
      }
    })

    await this.loadData()
  },
  destroyed() {
    this.subMutations()
    this.setLeaderboard([])
  }
}
</script>
