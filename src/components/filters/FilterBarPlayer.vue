<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderPlayer/>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
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
import FilterBarHeaderPlayer from '@/components/filters/FilterBarHeaderPlayer.vue'
import FilterFormatDoubles from '@/components/filters/FilterFormatDoubles.vue'
import FilterFormatSingles from '@/components/filters/FilterFormatSingles.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarPlayer',
  components: {
    FilterBarHeaderPlayer,
    FilterFormatDoubles,
    FilterFormatSingles
  },
  props: ['type'],
  computed: {
    filterFormat () {
      return FILTERS.PLAYER.FORMAT
    },
    optionsYears () {
      // generate the year options based on stats data and the current year
      const firstYear = new Date().getFullYear() - 2 // TODO: replace this with the actual first year from stats data
      const currentYear = new Date().getFullYear()
      const years = new Array(currentYear - firstYear + 1).fill().map((y, i) => currentYear - i)

      const options = [{ text: 'All', value: 'all' }]
      years.forEach(year => {
        options.push({ text: year, value: year })
      })

      return options
    }
  }
}
</script>
