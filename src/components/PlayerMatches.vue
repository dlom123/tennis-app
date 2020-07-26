<template>
  <v-expansion-panel>

    <v-expansion-panel-header color="primary">
      <v-row no-gutters>
        <v-col>
          <h2 class="white--text">Matches</h2>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="container-player-matches pt-2">
      <v-row v-if="matches.length > 0" no-gutters>
        <v-col cols="12">
          <MatchCard v-for="(match, i) in matches" :key="i" :match="match" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <p class="text-info" align="center">No matches to show.</p>
        </v-col>
      </v-row>
    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex'
import MatchCard from '@/components/MatchCard'

export default {
  name: 'playerMatches',
  components: {
    MatchCard
  },
  computed: {
    ...mapState([
      'playerMatchesDoubles',
      'playerMatchesSingles',
      'view'
    ]),
    matches() {
      return this.view === 'singles' ? this.playerMatchesSingles : this.playerMatchesDoubles
    }
  }
}
</script>
