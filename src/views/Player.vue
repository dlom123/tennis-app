<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>

      <v-col cols="1"></v-col>

      <v-col cols="10">
        <v-container class="container-player">
          <v-row no-gutters>

            <v-col sm="4" align="center" class="col-avatar">
              <v-img
                :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
                width="280"
                max-height="230"
                contain
                class="avatar"
              ></v-img>
            </v-col>

            <v-col cols="8" class="col-info">
              <v-row>

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

              </v-row>
            </v-col>

          </v-row>
        </v-container>
      </v-col>

      <v-col cols="1"></v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getGenderTextClass } from '@/utils/functions'

export default {
  name: 'player',
  computed: {
    ...mapState([
      'player'
    ])
  },
  methods: {
    ...mapActions([
      'getPlayer'
    ]),
    getTextHeaderClass (gender) {
      return getGenderTextClass(gender)
    }
  },
  created () {
    this.getPlayer(this.$route.params.playerId)
  }
}
</script>
