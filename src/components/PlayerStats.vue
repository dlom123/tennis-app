<template>
  <v-container fluid class="container-player-stats">

    <v-toolbar
      dark
      dense
      flat
      :class="['toolbar-player-stats', classToolbar]"
    >
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
        <v-row v-for="stat in player.stats" :key="stat.name">
          <v-col cols="3" class="stats-left" align="right">
            {{formatDisplayName(stat.name)}}
          </v-col>

          <v-col cols="9" class="stats-right">
            <v-progress-linear
              :value="getValue(stat.num, stat.denom)"
              :color="getColor(stat.num, stat.denom)"
              reactive
            >
              <strong>{{getDisplayValue(stat.num, stat.denom)}}</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row class="row-last-played">
          <v-col cols="12">
            <strong>Last Played:</strong> {{lastPlayedDate}}
          </v-col>
        </v-row>

      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'playerStats',
  props: ['player'],
  data () {
    return {
      aces: 10,
      lastPlayed: '2019-10-01'
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
    lastPlayedDate () {
      return moment(this.lastPlayed).format('dddd, MMMM Do, YYYY')
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
        } else if (this.player.gender === 'f') {
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
    formatDisplayName (name) {
      const splitName = name.split(' ')
      let formattedName = []

      splitName.forEach(n => {
        formattedName.push(`${n.substring(0, 1).toUpperCase()}${n.substring(1)}`)
      })
      formattedName = formattedName.join(' ')

      return formattedName
    },
    getColor (num, denom) {
      const value = this.getValue(num, denom)

      if (denom) {
        if (value < 30) {
          return 'rgba(230,0, 0, 0.8)'
        } else if (value <= 50) {
          return 'rgba(255, 145, 0, 0.8)'
        } else {
          return 'rgba(33, 150, 243, 0.8)'
        }
      }

      return 'rgba(33, 150, 243, 0.8)'
    },
    getPercentage (value) {
      return Math.round(100 * value)
    },
    getDisplayValue (num, denom) {
      const displayValue = this.getValue(num, denom)

      if (denom) {
        return `${displayValue}%`
      }

      return displayValue
    },
    getValue (num, denom) {
      if (denom) {
        return this.getPercentage(num / denom)
      }

      return num
    }
  },
  created () {
    console.log('PLAYER', this.player)
  }
}
</script>
