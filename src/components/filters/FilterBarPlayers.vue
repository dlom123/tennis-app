<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderPlayers/>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid class="filter-content">
          <v-row no-gutters>
            <v-col sm="4">
              <FilterFormatSingles v-if="type !== 'doubles'" :filterName="filterFormat" />
              <FilterFormatDoubles v-else :filterName="filterFormat" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FilterBarHeaderPlayers from '@/components/filters/FilterBarHeaderPlayers'
import FilterFormatDoubles from '@/components/filters/FilterFormatDoubles'
import FilterFormatSingles from '@/components/filters/FilterFormatSingles'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarPlayers',
  components: {
    FilterBarHeaderPlayers,
    FilterFormatDoubles,
    FilterFormatSingles
  },
  props: ['type'],
  computed: {
    filterFormat () {
      return FILTERS.PLAYERS.FORMAT
    }
  }
}
</script>
