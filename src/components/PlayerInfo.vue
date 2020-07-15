<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col
        cols="12"
        :class="getBorderClass(player.gender)"
        class="container-avatar mb-1 pt-2"
        align="center"
      >
        <v-img
          :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/${playerAvatar}`)"
          max-height="210"
          max-width="250"
          contain
        ></v-img>
      </v-col>
    </v-row>

    <v-row no-gutters>

      <v-col cols="12" class="mb-2">
        <h2 :class="getTextHeaderClass(player.gender)">{{ fullName }}</h2>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Rating</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ player.rating }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Gender</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ playerGender }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Height</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ heightString }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3 v-if="player.isRightHanded">Right-handed</h3>
            <h3 v-else>Left-handed</h3>
            <v-icon :color="!player.isRightHanded ? 'green' : ''">mdi-hand-left</v-icon>
            <v-icon :color="player.isRightHanded ? 'green' : ''">mdi-hand-right</v-icon>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Backhand</h3>
            <v-icon v-if="!player.isRightHanded || (player.isRightHanded && player.backhand === 2)" color="green">mdi-hand-left</v-icon>
            <v-icon v-if="player.isRightHanded || (!player.isRightHanded && player.backhand === 2)" color="green">mdi-hand-right</v-icon>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Last Played</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ lastPlayedDate }}</p>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { getDisplayGender, getGenderBorderClass, getGenderTextClass, translateHeight } from '@/utils/functions'

export default {
  name: 'playerInfo',
  data() {
    return {
      formatMatchDate: 'M/DD/YYYY'
    }
  },
  computed: {
    ...mapState([
      'player',
      'playerMatches'
    ]),
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
    },
    heightString() {
      return translateHeight(this.player.height)
    },
    lastPlayedDate() {
      // TODO: derive this from the most recent match involving the player (singles/doubles exclusive)
      if (!this.playerMatches.length) {
        return 'N/A'
      }
      let latestMatchDate = this.playerMatches[0].date
      this.playerMatches.forEach(match => {
        if (match.date > latestMatchDate) {
          latestMatchDate = match.date
        }
      })
      return moment(latestMatchDate).format(this.formatMatchDate)
    },
    playerAvatar() {
      return this.player.avatarUrl || 'silhouette.png'
    },
    playerGender() {
      return getDisplayGender(this.player.gender)
    }
  },
  methods: {
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  }
}
</script>

<style scoped lang="sass">
.container-avatar
  background-color: white
.border-men
  border: 2px solid #00b1ef
.border-women
  border: 2px solid #3313b5
.text-men
  color: #00b1ef
.text-women
  color: #3313b5
</style>
