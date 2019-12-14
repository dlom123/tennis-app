<template>
  <v-container fluid class="container-main">
    <v-row no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">
          <v-col>
            <h1>Leaderboard</h1>
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <v-btn-toggle
              group
              :value="viewType"
              @change="onChangeViewToggle"
            >
              <v-btn value="singles">Singles</v-btn>
              <v-btn value="doubles">Doubles</v-btn>
            </v-btn-toggle>
          </v-col>

        </v-row>

        <FilterBarLeaderboard/>

        <v-row no-gutters>
          <v-col cols="12">

            <v-row class="container-leaderboard-cards">
              <LeaderboardCard
                v-for="stat in leaders"
                :key="stat.stat"
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
import { mapActions, mapState } from 'vuex'
import FilterBarLeaderboard from '@/components/filters/FilterBarLeaderboard'
import LeaderboardCard from '@/components/LeaderboardCard'

export default {
  name: 'leaderboard',
  components: {
    FilterBarLeaderboard,
    LeaderboardCard
  },
  data() {
    return {
      unsubMutations: null,
      isViewToggleSingles: true,
      leaders: []
    }
  },
  computed: {
    ...mapState([
      'leaderboard'
    ]),
    viewType() {
      return this.isViewToggleSingles ? 'singles' : 'doubles'
    }
  },
  methods: {
    ...mapActions([
      'getLeaderboardTopThree'
    ]),
    onChangeViewToggle(value) {
      this.isViewToggleSingles = !this.isViewToggleSingles
    }
  },
  async created() {
    // subscribe to filter mutations so we can perform async API calls
    this.unsubMutations = this.$store.subscribe(async (mutation, state) => {
      if ((mutation.type === 'removeFilter' && mutation.payload.substring(0, 11) === 'leaderboard') ||
        (mutation.type === 'updateFilter' && mutation.payload.name.substring(0, 11) === 'leaderboard')
      ) {
        // we are modifying a filter that begins with the string 'leaderboard'
        this.leaders = await this.getLeaderboardTopThree()
      }
    })
    this.leaders = await this.getLeaderboardTopThree()
  },
  async destroyed() {
    await this.unsubMutations()
  }
}
</script>
