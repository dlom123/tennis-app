<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">

          <v-col>
            <h1>{{ stat.name }}</h1>
            <Breadcrumbs :items="breadcrumbItems" />
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <ToggleSinglesDoubles/>
          </v-col>

        </v-row>

        <FilterBarStat/>

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
import Breadcrumbs from '@/components/Breadcrumbs'
import FilterBarStat from '@/components/filters/FilterBarStat'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'

export default {
  name: 'stat',
  components: {
    Breadcrumbs,
    FilterBarStat,
    Spinner,
    ToggleSinglesDoubles
  },
  computed: {
    ...mapState([
      'isLoading',
      'stat'
    ]),
    breadcrumbItems() {
      return [
        { text: 'Leaderboard', to: { name: 'leaderboard' }, exact: true },
        { text: this.stat.name, disabled: true }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getStat'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setStat'
    ])
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['stat', 'leaderboard'])

    this.setLoading(true)
    await this.getStat(this.$route.params.statId)
    this.setLoading(false)
  },
  destroyed() {
    this.setStat({})
  }
}
</script>
