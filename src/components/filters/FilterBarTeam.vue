<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderTeam/>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid class="filter-content">
          <v-row no-gutters>
            <v-col sm="4">
              <FilterFormatDoubles :filterName="filterFormat" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FilterBarHeaderTeam from '@/components/filters/FilterBarHeaderTeam'
import FilterFormatDoubles from '@/components/filters/FilterFormatDoubles'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarTeam',
  components: {
    FilterBarHeaderTeam,
    FilterFormatDoubles
  },
  computed: {
    filterFormat () {
      return FILTERS.TEAM.FORMAT
    }
  }
}
</script>
