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
              <FilterFormat />
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
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBar',
  components: {
    FilterBarHeader,
    FilterFormat
  },
  data() {
    return {
      screenFilters: {
        'leaderboard': [FILTERS.FORMAT],
        'player': [FILTERS.FORMAT],
        'players': [FILTERS.FORMAT],
        'stat': [FILTERS.FORMAT],
        'team': [FILTERS.FORMAT],
        'teams': [FILTERS.FORMAT]
      }
    }
  },
  computed: {
    filterFormat() {
      return FILTERS.FORMAT
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
