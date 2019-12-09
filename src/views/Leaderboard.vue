<template>
  <v-container fluid class="container-main">
    <v-row no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">
          <v-col cols="12">
            <h1>Leaderboard</h1>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">

            <v-row class="container-leaderboard-cards">
              <LeaderboardCard/>
              <LeaderboardCard/>
              <LeaderboardCard/>
              <LeaderboardCard/>
              <LeaderboardCard/>
              <LeaderboardCard/>
            </v-row>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import LeaderboardCard from '@/components/LeaderboardCard'

export default {
  name: 'leaderboard',
  components: {
    LeaderboardCard
  },
  methods: {
    ...mapActions([
      'getLeaderboard'
    ])
  },
  created() {
    this.getLeaderboard()
  }
}
</script>
