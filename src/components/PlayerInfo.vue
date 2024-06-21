<template>
  <v-container v-if="!isLoading" fluid class="pa-0">
    <v-row no-gutters>
      <v-col
        cols="12"
        :class="getBorderClass(player.gender)"
        class="container-avatar mb-1 pt-2"
        align="center"
      >
        <v-img
          :src="getPlayerAvatar(player)"
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
            <p>{{ player.rating || '-' }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Gender</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ playerGender || '-' }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Height</h3>
          </v-col>
          <v-col cols="12">
            <p>{{ heightString || '-' }}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12" v-if="player.isRightHanded === null">
            <h3>Right/Left-handed</h3>
            -
          </v-col>
          <v-col cols="12" v-else>
            <h3>{{ player.isRightHanded ? 'Right-handed' : 'Left-handed' }}</h3>
            <v-icon
              :color="!player.isRightHanded ? 'green' : ''"
              :title="!player.isRightHanded ? 'Left-handed' : ''"
            >mdi-hand-back-left</v-icon>
            <v-icon
              :color="player.isRightHanded ? 'green' : ''"
              :title="player.isRightHanded ? 'Right-handed' : ''"
            >mdi-hand-back-right</v-icon>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Backhand</h3>
            <template v-if="player.backhand === null">
              -
            </template>
            <template v-else>
              <v-icon
                v-if="!player.isRightHanded || (player.isRightHanded && player.backhand === 2)"
                color="green"
                :title="player.backhand === 1 ? 'One-handed backhand' : 'Two-handed backhand'"
              >mdi-hand-back-left</v-icon>
              <v-icon
                v-if="player.isRightHanded || (!player.isRightHanded && player.backhand === 2)"
                color="green"
                :title="player.backhand === 1 ? 'One-handed backhand' : 'Two-handed backhand'"
              >mdi-hand-back-right</v-icon>
            </template>
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
import { getDisplayGender, getGenderBorderClass, getGenderTextClass, getPlayerAvatar, translateHeight } from '@/utils/functions'

export default {
  name: 'playerInfo',
  data() {
    return {
      formatMatchDate: 'M/DD/YYYY'
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'player',
      'playerMatchesDoubles',
      'playerMatchesSingles',
      'view'
    ]),
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
    },
    heightString() {
      return this.player.height ? translateHeight(this.player.height) : '-'
    },
    lastPlayedDate() {
      const playerMatches = this.view === 'singles' ? this.playerMatchesSingles : this.playerMatchesDoubles

      if (!playerMatches.length) {
        return '-'
      }
      let latestMatchDate = playerMatches[0].date
      playerMatches.forEach(match => {
        if (match.date > latestMatchDate) {
          latestMatchDate = match.date
        }
      })
      return moment.parseZone(latestMatchDate).format(this.formatMatchDate)
    },
    playerGender() {
      return getDisplayGender(this.player.gender)
    }
  },
  methods: {
    getPlayerAvatar,
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
