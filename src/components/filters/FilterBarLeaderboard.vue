<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderLeaderboard/>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid class="filter-content">
          <v-row no-gutters>
            <v-col sm="4">
              <FilterFormatSingles :filterName="filterFormat" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FilterBarHeaderLeaderboard from '@/components/filters/FilterBarHeaderLeaderboard'
import FilterFormatSingles from '@/components/filters/FilterFormatSingles'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarLeaderboard',
  components: {
    FilterBarHeaderLeaderboard,
    FilterFormatSingles
  },
  computed: {
    filterFormat() {
      return FILTERS.LEADERBOARD.FORMAT
    }
  }
}
</script>
