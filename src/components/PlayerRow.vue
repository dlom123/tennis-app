<template>
  <v-row no-gutters class="player-row" @click="goToPlayer">
    <v-col :key="`${player.id}`" sm="12" class="col-player">
      <v-row no-gutters>

        <v-col sm="3" class="col-avatar" align="center">

          <v-img
            :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
            width="280"
            max-height="230"
            contain
          ></v-img>

        </v-col>

        <v-col sm="9" class="col-info">
          <v-row no-gutters>

            <v-col sm="12">
              <h2 :class="getTextHeaderClass(player.gender)">{{ player.firstName }} {{ player.lastName }}</h2>
            </v-col>

            <v-col sm="3">

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Rating</h3>
                </v-col>
                <v-col sm="12">
                  <p>{{ player.rating }}</p>
                </v-col>
              </v-row>

            </v-col>

            <v-col sm="3">
              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Matches Played</h3>
                </v-col>
                <v-col sm="12">
                  <p>35</p>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { getGenderTextClass } from '@/utils/functions'

export default {
  name: 'playerRow',
  props: [
    'player',
    'type'
  ],
  methods: {
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    },
    goToPlayer() {
      this.$router.push({ name: 'player', params: { playerId: this.player.id, type: this.type } })
    }
  }
}
</script>

<style scoped lang="sass">
.player-row
  border-bottom: 2px solid #aaa
  background-color: white
  .col-player
    padding: 20px 0 0
    .col-avatar
      position: relative
    .col-info
      .text-men
        color: #00b1ef
      .text-women
        color: #3313b5
      .row-player-info
        margin-top: 15px
  &:hover
    cursor: pointer
</style>
