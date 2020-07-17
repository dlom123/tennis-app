<template>
  <v-expansion-panel>

    <v-expansion-panel-header color="primary">
      <v-row no-gutters>
        <v-col>
          <h2 class="white--text">Player Stats</h2>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="py-3">

      <v-row no-gutters class="stats-top pt-3 pb-2">
        <!-- <v-col v-for="stat in statsSimple" :key="stat.name" cols="6" align="center"> -->
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Match Win %</h3>
          <p>{{ displayMatchWinPercentage || 'N/A' }}</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Sets Played</h3>
          <p>{{ setsPlayed }}</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Tiebreaker Win %</h3>
          <p>3/5 (60%)</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Games Played</h3>
          <p>{{ gamesPlayed }}</p>
        </v-col>
      </v-row>

    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex'
import {
  calculateGamesPlayed,
  calculateMatchWinsDoubles,
  calculateMatchWinsSingles,
  calculateSetsPlayedDoubles,
  calculateSetsPlayedSingles,
  getPercentage
} from '@/utils/functions'

export default {
  name: 'playerStats',
  computed: {
    ...mapState([
      'playerMatchesDoubles',
      'playerMatchesSingles',
      'view'
    ]),
    displayMatchWinPercentage() {
      const percentage = getPercentage(this.matchWinPercentage.won, this.matchWinPercentage.of)
      return `${this.matchWinPercentage.won}/${this.matchWinPercentage.of} (${percentage}%)`
    },
    gamesPlayed() {
      let matches = []
      if (this.view === 'singles') {
        matches = this.playerMatchesSingles
      } else {
        matches = this.playerMatchesDoubles
      }

      return calculateGamesPlayed(matches, this.$route.params.playerId)
    },
    matchWinPercentage() {
      let matches = {}
      if (this.view === 'singles') {
        matches = calculateMatchWinsSingles(this.playerMatchesSingles, this.$route.params.playerId)
      } else {
        matches = calculateMatchWinsDoubles(this.playerMatchesDoubles, this.$route.params.playerId)
      }
      return matches
    },
    setsPlayed() {
      let totalSets = 0
      if (this.view === 'singles') {
        totalSets = calculateSetsPlayedSingles(this.playerMatchesSingles, this.$route.params.playerId)
      } else {
        totalSets = calculateSetsPlayedDoubles(this.playerMatchesDoubles, this.$route.params.playerId)
      }
      return totalSets
    }
  }
}
</script>
