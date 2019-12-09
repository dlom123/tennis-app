<template>
  <v-container fluid class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="10" offset-sm="1">
        <v-container class="container-team">

          <v-row>

            <v-col sm="3" class="col-info">
              <v-row v-for="player in team.players" :key="player.id" no-gutters class="row-player">

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

            <v-col cols="9" class="col-stats">

              <FilterBarTeam/>

              <v-row no-gutters class="section">
                <TeamStats :stats="team.stats" />
              </v-row>

              <v-row no-gutters class="section">
                <TeamMatches :matches="team.matches" />
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
import FilterBarTeam from '@/components/filters/FilterBarTeam'
import TeamMatches from '@/components/TeamMatches'
import TeamStats from '@/components/TeamStats'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'team',
  components: {
    FilterBarTeam,
    TeamMatches,
    TeamStats
  },
  computed: {
    ...mapState([
      'team'
    ])
  },
  methods: {
    ...mapActions([
      'getTeam'
    ]),
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  },
  created() {
    this.getTeam(this.$route.params.teamId)
  }
}
</script>
