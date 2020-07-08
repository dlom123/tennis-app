<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col cols="10" offset-sm="1">

        <v-container class="container-team pa-0">

          <v-row no-gutters class="row-title">
            <v-col>
              <NavBack text="Back to Teams" routeName="teams" />
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
                    :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
                    width="280"
                    max-height="230"
                    contain
                  ></v-img>
                </v-col>

                <v-col sm="12">
                  <h2 :class="getTextHeaderClass(player.gender)">{{ getFullName(player) }}</h2>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">

                    <v-col sm="12">
                      <h3>Rating</h3>
                    </v-col>

                    <v-col sm="12">
                      <p>4.0</p>
                    </v-col>

                  </v-row>
                </v-col>

                <v-col sm="6">
                  <v-row no-gutters class="row-player-info">

                    <v-col sm="12">
                      <h3>Height</h3>
                    </v-col>

                    <v-col sm="12">
                      <p>5'9"</p>
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
                      <p>8/1/2019</p>
                    </v-col>

                  </v-row>
                </v-col>

              </v-row>
            </v-col>

            <v-col cols="9" class="col-stats">

              <FilterBar :screenFilters="screenFilters" :isDoubles="true" />

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
import FilterBar from '@/components/filters/FilterBar'
import NavBack from '@/components/NavBack'
import Spinner from '@/components/Spinner'
import TeamMatches from '@/components/TeamMatches'
import TeamStats from '@/components/TeamStats'
import { FILTERS } from '@/utils/constants'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'team',
  components: {
    FilterBar,
    NavBack,
    Spinner,
    TeamMatches,
    TeamStats
  },
  data() {
    return {
      screenFilters: [FILTERS.FORMAT]
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'team'
    ])
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
.container-team
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
