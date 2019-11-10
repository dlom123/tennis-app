<template>
  <v-row class="player-row-singles" @click="goToPlayer">
    <v-col :key="`${player.id}`" sm="12" class="col-player">
      <v-row no-gutters>

        <v-col sm="3" class="col-avatar" align="center">

          <h1
            :class="getTextHeaderClass(player.gender)"
            class="ranking"
          >{{ ranking }}</h1>

          <v-img
            :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
            width="280"
            max-height="230"
            contain
            class="avatar"
          ></v-img>

        </v-col>

        <v-col sm="9" class="col-info">
          <v-row no-gutters>

            <v-col sm="12">
              <h1 :class="getTextHeaderClass(player.gender)">{{player.firstName}} {{player.lastName}}</h1>
            </v-col>

            <v-col sm="3">

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Ranking Points</h3>
                </v-col>
                <v-col sm="12">
                  {{ player.points }}
                </v-col>
              </v-row>

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Matches Played</h3>
                </v-col>
                <v-col sm="12">
                  35
                </v-col>
              </v-row>

            </v-col>

            <v-col sm="3">
              <v-row no-gutters class="row-player-info">

                <v-col sm="12">
                  <h3>Rating</h3>
                </v-col>

                <v-col sm="12">
                  4.0
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
  name: 'playerRowSingles',
  props: [
    'player',
    'ranking'
  ],
  methods: {
    getTextHeaderClass (gender) {
      return getGenderTextClass(gender)
    },
    goToPlayer () {
      this.$router.push({ name: 'player', params: { playerId: this.player.id } })
    }
  }
}
</script>
