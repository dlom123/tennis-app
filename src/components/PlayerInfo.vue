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
          :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer-xs' : 'halep-xs'}.png`)"
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
            <p>4.0</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Height</h3>
          </v-col>
          <v-col cols="12">
            <p>5'9"</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Right-handed</h3>
            <v-icon>mdi-hand-left</v-icon>
            <v-icon color="green">mdi-hand-right</v-icon>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <h3>Last Played</h3>
          </v-col>
          <v-col cols="12">
            <p>8/1/2019</p>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'playerInfo',
  props: ['player'],
  computed: {
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
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
