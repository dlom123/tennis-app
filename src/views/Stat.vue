<template>
  <v-container fluid class="container-main">
    <v-row no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">
          <v-col>
            <h1>Leaderboard : {{ stat.name }}</h1>
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

        <FilterBarLeaderboard/>

        <v-row no-gutters>
          <v-col cols="12">

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import FilterBarLeaderboard from '@/components/filters/FilterBarLeaderboard'

export default {
  name: 'stat',
  components: {
    FilterBarLeaderboard
  },
  computed: {
    ...mapState([
      'stat'
    ]),
    viewType() {
      return this.isViewToggleSingles ? 'singles' : 'doubles'
    }
  },
  methods: {
    ...mapActions([
      'getStat'
    ]),
    ...mapMutations([
      'setStat'
    ]),
    onChangeViewToggle(value) {
      this.isViewToggleSingles = !this.isViewToggleSingles
    }
  },
  created() {
    this.getStat(this.$route.params.statId)
  },
  destroyed() {
    this.setStat({})
  }
}
</script>
