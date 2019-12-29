<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col cols="10" offset-sm="1">

        <v-container class="container-team">

          <v-row no-gutters class="row-title">
            <v-col>
              <h1>{{ getFullNames(team) }}</h1>
              <Breadcrumbs :items="breadcrumbItems"></Breadcrumbs>
            </v-col>
          </v-row>

          <v-row>

            <v-col sm="3" class="col-info">
              <v-row v-for="player in team.players" :key="player.id" no-gutters class="row-player">

                <v-col
                  cols="12"
                  :class="getBorderClass(player.gender)"
                  class="container-avatar"
                  align="center"
                >
                  <v-img
                    :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
                    width="280"
                    max-height="230"
                    contain
                  ></v-img>
                </v-col>

                <v-col sm="12">
                  <h1 :class="getTextHeaderClass(player.gender)">{{ getFullName(player) }}</h1>
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

              <FilterBar />

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
import { mapActions, mapMutations, mapState } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'
import FilterBar from '@/components/filters/FilterBar'
import Spinner from '@/components/Spinner'
import TeamMatches from '@/components/TeamMatches'
import TeamStats from '@/components/TeamStats'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'team',
  components: {
    Breadcrumbs,
    FilterBar,
    Spinner,
    TeamMatches,
    TeamStats
  },
  computed: {
    ...mapState([
      'isLoading',
      'team'
    ]),
    breadcrumbItems() {
      return [
        { text: 'Teams', to: { name: 'teams' }, exact: true },
        { text: this.getFullNames(this.team), disabled: true }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getTeam'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setTeam'
    ]),
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getFullName(player) {
      return `${player.firstName} ${player.lastName}`
    },
    getFullNames(team) {
      const names = team.players.map(player => `${player.firstName} ${player.lastName}`)

      return names.join('/')
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['team', 'teams'])

    this.setLoading(true)
    await this.getTeam(this.$route.params.teamId)
    this.setLoading(false)
  },
  destroyed() {
    this.setTeam({})
  }
}
</script>

<style scoped lang="sass">
.container-main
  background-color: #eeeeee

.container-team
  padding: 0
  .row-title
    margin: 10px 0 15px 0
  .col-info
    .row-player
      margin-bottom: 20px
      .border-men
        border: 2px solid #00b1ef
      .border-women
        border: 2px solid #3313b5
      .text-men
        color: #00b1ef
      .text-women
        color: #3313b5
      .row-player-info
        margin-bottom: 10px
  .col-stats
    .section
      margin-bottom: 30px

.container-avatar
  background-color: white
</style>
