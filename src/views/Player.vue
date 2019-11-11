<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>

      <v-col cols="1"></v-col>

      <v-col cols="10">
        <v-container class="container-player">
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

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">

                    <v-col sm="12">
                      <h3>Rank</h3>
                    </v-col>

                    <v-col sm="12">
                      1
                    </v-col>

                  </v-row>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">

                    <v-col sm="12">
                      <h3>Ranking Points</h3>
                    </v-col>

                    <v-col sm="12">
                      150
                    </v-col>

                  </v-row>
                </v-col>

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

                <v-col sm="12">
                  <v-row no-gutters class="row-player-info">
                    <v-col sm="12">
                      <h3>Right-handed</h3>
                      <v-icon>mdi-hand-left</v-icon>
                      <v-icon color="green">mdi-hand-right</v-icon>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col sm="12">
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

              <v-row no-gutters>
                <v-col sm="12">
                  <h1>Player Stats</h1>
                </v-col>
              </v-row>

              <v-row no-gutters class="stats-top">

                <v-col sm="2">
                  <v-row>

                    <v-col cols="12" align="right">
                      <strong>Aces</strong>
                    </v-col>

                    <v-col cols="12" align="right">
                      <strong>Winners</strong>
                    </v-col>

                  </v-row>
                </v-col>

                <v-col sm="4" class="col-stat">
                  <v-row>

                    <v-col cols="12">
                      22
                    </v-col>

                    <v-col cols="12">
                      24
                    </v-col>

                  </v-row>
                </v-col>

                <v-col sm="2">
                  <v-row>

                    <v-col cols="12" align="right">
                      <strong>Double Faults</strong>
                    </v-col>

                    <v-col cols="12" align="right">
                      <strong>Unforced Errors</strong>
                    </v-col>

                  </v-row>
                </v-col>

                <v-col sm="4" class="col-stat">
                  <v-row>

                    <v-col cols="12">
                      13
                    </v-col>

                    <v-col cols="12">
                      19
                    </v-col>

                  </v-row>
                </v-col>

              </v-row>

              <v-row no-gutters>
                <v-col sm="2">

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>1st Serve In</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>1st Serve Return</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>2nd Serve Return</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>1st Serve Points Won</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>2nd Serve Points Won</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>Net Points Won</strong>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" align="right">
                      <strong>Break Points Won</strong>
                    </v-col>
                  </v-row>

                </v-col>

                <v-col sm="10" class="col-stat">

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="62"
                      >
                        <strong>62%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="78"
                      >
                        <strong>78%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="96"
                      >
                        <strong>96%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="72"
                      >
                        <strong>72%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="53"
                      >
                        <strong>53%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="35"
                      >
                        <strong>35%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-progress-linear
                        height="25"
                        value="60"
                      >
                        <strong>60%</strong>
                      </v-progress-linear>
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
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

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
