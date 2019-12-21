<template>
  <v-container fluid class="grey lighten-5">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col cols="10" offset-sm="1">
        <v-container class="container-player">

          <v-row no-gutters class="row-title">

            <v-col>
              <h1>{{ fullName }}</h1>
              <Breadcrumbs :items="breadcrumbItems"></Breadcrumbs>
            </v-col>

            <v-spacer></v-spacer>

            <v-col align="right">
              <ToggleSinglesDoubles />
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
                  <h1 :class="getTextHeaderClass(player.gender)">{{ fullName }}</h1>
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
                <PlayerStats :stats="player.stats" :view="view" />
              </v-row>

              <v-row no-gutters class="section">
                <PlayerMatches :matches="player.matches" :view="view" />
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
import PlayerMatches from '@/components/PlayerMatches'
import PlayerStats from '@/components/PlayerStats'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'player',
  components: {
    Breadcrumbs,
    FilterBar,
    PlayerMatches,
    PlayerStats,
    Spinner,
    ToggleSinglesDoubles
  },
  computed: {
    ...mapState([
      'isLoading',
      'player',
      'view'
    ]),
    breadcrumbItems() {
      return [
        { text: 'Players', to: { name: 'players' }, exact: true },
        { text: this.fullName, disabled: true }
      ]
    },
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
    }
  },
  methods: {
    ...mapActions([
      'getPlayer'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setPlayer'
    ]),
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['player', 'players'])

    this.setLoading(true)
    await this.getPlayer(this.$route.params.playerId)
    this.setLoading(false)
  },
  destroyed() {
    this.setPlayer({})
  }
}
</script>
