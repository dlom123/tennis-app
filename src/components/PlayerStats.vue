<template>
  <v-container fluid class="container-player-stats">

    <v-toolbar dark dense :class="['toolbar-player-stats', classToolbar]">
      <v-btn icon dark @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="toolbar-player-name">{{playerName}}</v-toolbar-title>
    </v-toolbar>

    <v-row class="row-player-stats">

      <v-col cols="4" class="col-left" align="center">
        <v-img
          :src="require(`@/assets/images/players/${playerPhoto}`)"
          height="600"
          width="400"
        ></v-img>
      </v-col>

      <v-col class="col-right">
        <v-row>

          <v-col cols="3" class="stats-left" align="right">
            Aces
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="player.stats.aces"
              color="rgba(33, 150, 243, 0.8)"
              reactive
            >
              <strong>{{player.stats.aces}}</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            Double Faults
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="player.stats.doubleFaults"
              color="rgba(33, 150, 243, 0.8)"
              reactive
            >
              <strong>{{player.stats.doubleFaults}}</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            Winners
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="player.stats.winners"
              color="rgba(33, 150, 243, 0.8)"
              reactive
            >
              <strong>{{player.stats.winners}}</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            Unforced Errors
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="player.stats.unforcedErrors"
              color="rgba(33, 150, 243, 0.8)"
              reactive
            >
              <strong>{{player.stats.unforcedErrors}}</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            1st Serve Return %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="firstServeReturnPct"
              :color="getColor(firstServeReturnPct)"
              reactive
            >
              <strong>{{firstServeReturnPct}}%</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            2nd Serve Return %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="secondServeReturnPct"
              :color="getColor(secondServeReturnPct)"
              reactive
            >
              <strong>{{secondServeReturnPct}}%</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            1st Serve Points Won %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="firstServePointsWonPct"
              :color="getColor(firstServePointsWonPct)"
              reactive
            >
              <strong>{{firstServePointsWonPct}}%</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            2nd Serve Points Won %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="secondServePointsWonPct"
              :color="getColor(secondServePointsWonPct)"
              reactive
            >
              <strong>{{secondServePointsWonPct}}%</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            Net Points Won %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="netPointsWonPct"
              :color="getColor(netPointsWonPct)"
              reactive
            >
              <strong>{{netPointsWonPct}}%</strong>
            </v-progress-linear>
          </v-col>

          <v-col cols="3" class="stats-left" align="right">
            Break Points Won %
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="breakPointsWonPct"
              :color="getColor(breakPointsWonPct)"
              reactive
            >
              <strong>{{breakPointsWonPct}}%</strong>
            </v-progress-linear>
          </v-col>

        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'playerStats',
  props: ['player'],
  data () {
    return {
      aces: 10
    }
  },
  computed: {
    breakPointsWonPct () {
      return this.getPercentage(this.player.stats.breakPointsWon[0] / this.player.stats.breakPointsWon[1])
    },
    classToolbar () {
      return this.player &&
        this.player.gender === 'm' ? 'men' : 'women'
    },
    firstServePointsWonPct () {
      return this.getPercentage(this.player.stats.firstServePointsWon[0] / this.player.stats.firstServePointsWon[1])
    },
    firstServeReturnPct () {
      return this.getPercentage(this.player.stats.firstServeReturn[0] / this.player.stats.firstServeReturn[1])
    },
    netPointsWonPct () {
      return this.getPercentage(this.player.stats.netPointsWon[0] / this.player.stats.netPointsWon[1])
    },
    secondServePointsWonPct () {
      return this.getPercentage(this.player.stats.secondServePointsWon[0] / this.player.stats.secondServePointsWon[1])
    },
    secondServeReturnPct () {
      return this.getPercentage(this.player.stats.secondServeReturn[0] / this.player.stats.secondServeReturn[1])
    },
    playerName () {
      return this.player ? `${this.player.firstName} ${this.player.lastName}` : ''
    },
    playerPhoto () {
      const men = ['anderson', 'djokovic', 'federer', 'nadal', 'simon', 'zverev']
      const women = ['sharapova']
      let playerImage

      if (this.player.img) {
        const playerName = this.player.img.substring(this.player.img.lastIndexOf('/') + 1, this.player.img.lastIndexOf('.'))

        if (this.player.gender === 'm') {
          if (men.some(m => m === playerName)) playerImage = `placeholders/men/${playerName}.png`
          else playerImage = 'placeholders/men/silhouette.png'
        } else if (this.player.gender === 'w') {
          if (women.some(w => w === playerName)) playerImage = `placeholders/women/${playerName}.png`
          else playerImage = 'placeholders/women/silhouette.png'
        }
      } else {
        if (this.player.gender === 'm') {
          playerImage = 'placeholders/men/silhouette.png'
        } else {
          playerImage = 'placeholders/women/silhouette.png'
        }
      }

      return playerImage
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentPlayer',
      'setShowPlayerDialog'
    ]),
    closeDialog () {
      this.setShowPlayerDialog(false)
    },
    getColor (value) {
      if (value <= 25) {
        return 'rgba(230,0, 0, 0.8)'
      } else if (value <= 50) {
        return 'rgba(255, 145, 0, 0.8)'
      } else if (value <= 75) {
        return 'rgba(255, 230, 0, 0.8)'
      } else {
        return 'rgba(0, 200, 0, 0.8)'
      }
    },
    getPercentage (value) {
      return Math.round(100 * value)
    }
  }
}
</script>
