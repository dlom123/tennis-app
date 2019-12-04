<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderPlayer
          :clearFilterFormat="clearFilterFormat"
          :clearFilterYear="clearFilterYear"
        />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="4">Format</v-col>
            <v-col sm="4">Year</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="4">
              <v-radio-group v-model="format" @change="onChangeFormat">
                <v-radio
                  label="men"
                  value="men"
                />
                <v-radio
                  label="women"
                  value="women"
                />
                <v-radio v-if="type === 'doubles'"
                  label="mixed"
                  value="mixed"
                />
              </v-radio-group>
            </v-col>
            <v-col sm="4">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-select
                    hide-details
                    dense
                    outlined
                    :items="optionsYears"
                    @change="onChangeYear"
                    value="all"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterBarHeaderPlayer from '@/components/filters/FilterBarHeaderPlayer.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarPlayer',
  components: {
    FilterBarHeaderPlayer
  },
  props: ['type'],
  data () {
    return {
      format: null,
      year: null
    }
  },
  computed: {
    ...mapState([
      'filters'
    ]),
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
  },
  methods: {
    ...mapMutations([
      'removeFilter',
      'updateFilter'
    ]),
    clearFilterFormat () {
      this.format = null

      this.removeFilter(FILTERS.PLAYER.FORMAT)
    },
    clearFilterYear () {
      this.year = null

      this.removeFilter(FILTERS.PLAYER.YEAR)
    },
    onChangeFormat (value) {
      this.updateFilter({ name: FILTERS.PLAYER.FORMAT, value })
    },
    onChangeYear (value) {
      this.updateFilter({ name: FILTERS.PLAYER.YEAR, value })
    }
  }
}
</script>
