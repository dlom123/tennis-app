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
              <v-btn-toggle
                group
                :value="viewType"
                @change="onChangeViewToggle"
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
                  <h1 :class="getTextHeaderClass(player.gender)">{{ fullName }}</h1>
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

              <FilterBarPlayer/>

              <v-row no-gutters class="section">
                <PlayerStats :stats="player.stats" :view="viewType" />
              </v-row>

              <v-row no-gutters class="section">
                <PlayerMatches :matches="player.matches" :view="viewType" />
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
import FilterBarPlayer from '@/components/filters/FilterBarPlayer'
import PlayerMatches from '@/components/PlayerMatches'
import PlayerStats from '@/components/PlayerStats'
import Spinner from '@/components/Spinner'
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'player',
  components: {
    Breadcrumbs,
    FilterBarPlayer,
    PlayerMatches,
    PlayerStats,
    Spinner
  },
  data() {
    return {
      isViewToggleSingles: true
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'player'
    ]),
    breadcrumbItems() {
      return [
        { text: 'Players', to: { name: this.viewType }, exact: true },
        { text: this.fullName, disabled: true }
      ]
    },
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
    },
    viewType() {
      return this.isViewToggleSingles ? 'singles' : 'doubles'
    }
  },
  methods: {
    ...mapActions([
      'getPlayer',
      'removePlayerFilters'
    ]),
    ...mapMutations([
      'setLoading'
    ]),
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    },
    onChangeViewToggle(value) {
      this.isViewToggleSingles = !this.isViewToggleSingles
    }
  },
  async created() {
    // set the view based on where the user arrived from
    this.isViewToggleSingles = !(this.$route.params.type && this.$route.params.type === 'doubles')

    this.setLoading(true)
    await this.getPlayer(this.$route.params.playerId)
    this.setLoading(false)
  },
  destroyed() {
    this.removePlayerFilters()
  }
}
</script>
