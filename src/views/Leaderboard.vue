<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">

          <v-col>
            <h1>Leaderboard</h1>
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <ToggleSinglesDoubles />
          </v-col>

        </v-row>

        <FilterBar />

        <v-row no-gutters>
          <v-col cols="12">

            <v-row class="container-leaderboard-cards">
              <LeaderboardCard
                v-for="stat in leaderboard"
                :key="stat.name"
                :stat="stat"
              />
            </v-row>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import FilterBar from '@/components/filters/FilterBar'
import LeaderboardCard from '@/components/LeaderboardCard'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'

export default {
  name: 'leaderboard',
  components: {
    FilterBar,
    LeaderboardCard,
    Spinner,
    ToggleSinglesDoubles
  },
  data() {
    return {
      isLoading: true,
      unsubMutations: null
    }
  },
  computed: {
    ...mapState([
      'leaderboard'
    ])
  },
  methods: {
    ...mapActions([
      'getLeaderboardTopThree'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLeaderboard'
    ]),
    async loadData() {
      this.isLoading = true
      await this.getLeaderboardTopThree()
      this.isLoading = false
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['leaderboard'])

    // subscribe to leaderboard filter mutations so we can perform async API calls
    this.unsubMutations = this.$store.subscribe(async (mutation, state) => {
      if ((mutation.type === 'removeFilter' && mutation.payload.screen === 'leaderboard') ||
        (mutation.type === 'updateFilter' && mutation.payload.screen === 'leaderboard')
      ) {
        await this.loadData()
      }
    })

    await this.loadData()
  },
  destroyed() {
    this.unsubMutations()
    this.setLeaderboard([])
  }
}
</script>
