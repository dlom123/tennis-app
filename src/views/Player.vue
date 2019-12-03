<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>

      <v-col cols="10" offset-sm="1">
        <v-container class="container-player">

          <v-row no-gutters class="row-toggle">
            <v-col cols="8" offset-sm="3" align="right">
              <v-btn-toggle
                group
                :value="$route.params.type || 'singles'"
              >
                <v-btn value="singles">Singles</v-btn>
                <v-btn value="doubles">Doubles</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-row>

            <v-col sm="3" class="col-info">
              <v-row no-gutters>

                <v-col cols="12">
                  <v-img
                    :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
                    width="280"
                    max-height="230"
                    contain
                    :class="getBorderClass(player.gender)"
                    class="avatar"
                  ></v-img>
                </v-col>

                <v-col sm="12">
                  <h1 :class="getTextHeaderClass(player.gender)">{{player.firstName}} {{player.lastName}}</h1>
                </v-col>

                <!-- <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Rank</h3>
                    </v-col>
                    <v-col sm="12">
                      1
                    </v-col>
                  </v-row>
                </v-col> -->

                <!-- <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Ranking Points</h3>
                    </v-col>
                    <v-col sm="12">
                      150
                    </v-col>
                  </v-row>
                </v-col> -->

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Rating</h3>
                    </v-col>
                    <v-col sm="12">
                      4.0
                    </v-col>
                  </v-row>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Height</h3>
                    </v-col>
                    <v-col sm="12">
                      5'9"
                    </v-col>
                  </v-row>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Right-handed</h3>
                      <v-icon>mdi-hand-left</v-icon>
                      <v-icon color="green">mdi-hand-right</v-icon>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Last Played</h3>
                    </v-col>
                    <v-col sm="12">
                      8/1/2019
                    </v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-col>

            <v-col cols="8" class="col-stats">

              <v-row no-gutters class="section">
                <PlayerStats/>
              </v-row>

              <v-row no-gutters class="section">
                <PlayerStats/>
              </v-row>

              <v-row no-gutters class="section">
                <PlayerStats/>
              </v-row>

            </v-col>

          </v-row>

        </v-container>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlayerMatches from '@/components/PlayerMatches'
import PlayerStats from '@/components/PlayerStats'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'player',
  components: {
    PlayerMatches,
    PlayerStats
  },
  computed: {
    ...mapState([
      'player'
    ])
  },
  methods: {
    ...mapActions([
      'getPlayer'
    ]),
    getBorderClass (gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass (gender) {
      return getGenderTextClass(gender)
    }
  },
  created () {
    this.getPlayer(this.$route.params.playerId)
  }
}
</script>
