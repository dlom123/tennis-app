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
          <p>{{ matchWinPercentage || 'N/A' }}</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Sets Played</h3>
          <p>36</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Tiebreaker Win %</h3>
          <p>3/5 (60%)</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Games Played</h3>
          <p>360</p>
        </v-col>
      </v-row>

    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex'
import { calculateMatchWinsDoubles, calculateMatchWinsSingles } from '@/utils/functions'

export default {
  name: 'playerStats',
  computed: {
    ...mapState([
      'playerMatches',
      'view'
    ]),
    matchWinPercentage() {
      if (!this.playerMatches.length) {
        return {}
      }
      let result = {}
      if (this.view === 'singles') {
        result = calculateMatchWinsSingles(this.playerMatches, this.$route.params.playerId)
      } else {
        result = calculateMatchWinsDoubles(this.playerMatches, this.$route.params.playerId)
      }
      return result
    }
  }
}
</script>
