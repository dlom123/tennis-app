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
              <FilterFormat :filterName="filterFormat" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex'
import FilterBarHeaderLeaderboard from '@/components/filters/FilterBarHeaderLeaderboard'
import FilterFormat from '@/components/filters/FilterFormat'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarLeaderboard',
  components: {
    FilterBarHeaderLeaderboard,
    FilterFormat
  },
  computed: {
    ...mapState([
      'view'
    ]),
    filterFormat() {
      return FILTERS.FORMAT
    }
  }
}
</script>
