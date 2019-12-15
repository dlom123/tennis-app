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
            <ToggleSinglesDoubles/>
          </v-col>

        </v-row>

        <FilterBarLeaderboard/>

        <v-row no-gutters>
          <v-col cols="12">

            <v-row class="container-leaderboard-cards">
              <LeaderboardCard
                v-for="stat in leaders"
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
import FilterBarLeaderboard from '@/components/filters/FilterBarLeaderboard'
import LeaderboardCard from '@/components/LeaderboardCard'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'

export default {
  name: 'leaderboard',
  components: {
    FilterBarLeaderboard,
    LeaderboardCard,
    Spinner,
    ToggleSinglesDoubles
  },
  data() {
    return {
      isLoading: true,
      leaders: [],
      unsubMutations: null
    }
  },
  computed: {
    ...mapState([
      'leaderboard',
      'view'
    ])
  },
  methods: {
    ...mapActions([
      'getLeaderboardTopThree'
    ]),
    ...mapMutations([
      'setLeaderboard'
    ]),
    async loadData() {
      this.isLoading = true
      this.leaders = await this.getLeaderboardTopThree()
      this.isLoading = false
    }
  },
  async created() {
    // subscribe to filter mutations so we can perform async API calls
    this.unsubMutations = this.$store.subscribe(async (mutation, state) => {
      // if we are modifying a filter that begins with the string 'leaderboard'
      if ((mutation.type === 'removeFilter' && mutation.payload.substring(0, 11) === 'leaderboard') ||
        (mutation.type === 'updateFilter' && mutation.payload.name.substring(0, 11) === 'leaderboard')
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
