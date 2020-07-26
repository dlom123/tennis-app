<template>
  <v-container v-if="!isLoading" fluid class="pa-0">

    <v-row
      no-gutters
      :class="{
        'px-2 pt-3': $vuetify.breakpoint.xsOnly,
        'mt-4': $vuetify.breakpoint.smAndUp
      }"
    >
      <v-col>
        <NavBack text="Back to Players" routeName="players" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <ToggleSinglesDoubles />
      </v-col>
    </v-row>

    <v-row no-gutters v-if="$vuetify.breakpoint.smAndDown" class="mt-3">
      <v-col cols="12" :class="{ 'px-3': $vuetify.breakpoint.xsOnly }" class="pb-2">
        <PlayerInfo />
      </v-col>
      <v-col cols="12">
        <PlayerData />
      </v-col>
    </v-row>
    <v-row v-else>

      <v-col md="4">
        <PlayerInfo />
      </v-col>

      <v-col md="8">

        <!-- <v-row class="mt-4 mb-1"> -->
          <!-- <v-col cols="12" class="py-0"> -->
            <!-- <FilterBar v-if="screenFilters.length > 0" :screenFilters="screenFilters" /> -->
          <!-- </v-col> -->
        <!-- </v-row> -->

        <PlayerData />

      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import FilterBar from '@/components/filters/FilterBar'
import NavBack from '@/components/NavBack'
import PlayerData from '@/components/PlayerData'
import PlayerInfo from '@/components/PlayerInfo'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'

export default {
  name: 'player',
  components: {
    // eslint-disable-next-line
    FilterBar,
    NavBack,
    PlayerData,
    PlayerInfo,
    ToggleSinglesDoubles
  },
  data() {
    return {
      screenFilters: []
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'view'
    ])
  },
  methods: {
    ...mapActions([
      'getPlayer',
      'getPlayerMatches'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setPlayer',
      'setPlayerMatchesDoubles',
      'setPlayerMatchesSingles'
    ])
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['player', 'players'])

    this.setLoading(true)
    await this.getPlayer(this.$route.params.playerId)
    await this.getPlayerMatches({ playerId: this.$route.params.playerId })
    this.setLoading(false)
  },
  destroyed() {
    this.setPlayer({})
    this.setPlayerMatchesDoubles([])
    this.setPlayerMatchesSingles([])
  }
}
</script>
