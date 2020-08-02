<template>
  <v-card
    outlined
    class="mb-2"
  >
    <v-row no-gutters class="mb-3">
      <v-col>
        <v-row no-gutters class="blue white--text font-weight-bold">
          <v-col class="px-2 pt-1">{{ displayMatchDate }}</v-col>
        </v-row>
        <v-row no-gutters class="blue white--text font-italic">
          <v-col class="px-2 pb-1">{{ match.location.name }}</v-col>
        </v-row>
      </v-col>
    </v-row>

    <SetsRow v-for="(side, i) in sides" :key="i" :side="side" />

    <!-- <v-divider></v-divider>

    <AddSetsRow
      :numPlayersPerSide="numPlayersPerSide"
      :showTiebreakerRows="showTiebreakerRows"
      side="2"
      class="pb-2" /> -->

    <!--
    <v-divider></v-divider>

    <v-row no-gutters>
      <v-col class="pl-2 pt-1">
        <v-btn
          text
          x-small
          color="blue"
          @click="showTiebreakerRows = !showTiebreakerRows"
        >
          <template v-if="!showTiebreakerRows">
            Show tiebreaker scores
          </template>
          <template v-else>
            Hide tiebreaker scores
          </template>
        </v-btn>
      </v-col>
    </v-row> -->

  </v-card>

</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import SetsRow from '@/components/SetsRow'
import { getMatchWinnerDoubles, getMatchWinnerSingles } from '@/utils/functions'

export default {
  name: 'matchCard',
  components: {
    SetsRow
  },
  props: ['match'],
  data() {
    return {
      formatMatchDate: 'dddd, MMMM Do YYYY'
    }
  },
  computed: {
    ...mapState([
      'view'
    ]),
    displayMatchDate() {
      return moment.parseZone(this.match.date).format(this.formatMatchDate)
    },
    sides() {
      let winnerId = 0
      let scoreData = {}
      if (this.view === 'singles') {
        scoreData = getMatchWinnerSingles(this.match)
        winnerId = scoreData.playerId
      } else {
        scoreData = getMatchWinnerDoubles(this.match)
        winnerId = scoreData.teamId
      }
      const ids = Object.keys(scoreData.scoreline)
      return ids.map(id => ({
        ...scoreData.scoreline[id],
        isWinner: id === winnerId
      }))
    }
  }
}
</script>
