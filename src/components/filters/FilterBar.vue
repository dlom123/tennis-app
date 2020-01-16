<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeader />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid class="filter-content">
          <v-row no-gutters>
            <v-col sm="2" v-if="screenHasFilter($route.name, filterFormat)">
              <FilterFormat :isDoubles="isDoubles" />
            </v-col>
            <v-col sm="3" v-if="screenHasFilter($route.name, filterRating)">
              <FilterRating :isDoubles="isDoubles" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FilterBarHeader from '@/components/filters/FilterBarHeader'
import FilterFormat from '@/components/filters/FilterFormat'
import FilterRating from '@/components/filters/FilterRating'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBar',
  components: {
    FilterBarHeader,
    FilterFormat,
    FilterRating
  },
  props: ['isDoubles'],
  data() {
    return {
      screenFilters: {
        'leaderboard': [FILTERS.FORMAT],
        'player': [FILTERS.FORMAT],
        'players': [FILTERS.FORMAT, FILTERS.RATING],
        'stat': [FILTERS.FORMAT],
        'team': [FILTERS.FORMAT],
        'teams': [FILTERS.FORMAT, FILTERS.RATING]
      }
    }
  },
  computed: {
    filterFormat() {
      return FILTERS.FORMAT
    },
    filterRating() {
      return FILTERS.RATING
    }
  },
  methods: {
    screenHasFilter(screen, filterName) {
      return this.screenFilters.hasOwnProperty(screen) && this.screenFilters[screen].includes(filterName)
    }
  }
}
</script>

<style scoped lang="sass">
.filter-bar
  margin-bottom: 10px
  .header
    height: 65px
  .filter-content
    padding: 0
</style>
