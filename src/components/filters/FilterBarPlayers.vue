<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderPlayers
          :clearFilterDateRange="clearFilterDateRange"
          :clearFilterFormat="clearFilterFormat"
        />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="4">Format</v-col>
            <!-- <v-col sm="4">Year</v-col> -->
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
            <!-- <v-col sm="4">
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
            </v-col> -->
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterBarHeaderPlayers from '@/components/filters/FilterBarHeaderPlayers.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarPlayers',
  components: {
    FilterBarHeaderPlayers
  },
  props: ['type'],
  data () {
    return {
      dateFrom: null,
      dateTo: null,
      format: null
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
    clearFilterDateRange () {
      this.dateFrom = null
      this.dateTo = null

      this.removeFilter(FILTERS.PLAYERS.DATE_RANGE)
    },
    clearFilterDateRangeFrom () {
      this.dateFrom = null

      const dateRange = this.filters.find(f => f.name === FILTERS.PLAYERS.DATE_RANGE)
      delete dateRange.from
      if (dateRange.hasOwnProperty('to')) {
        // the date range filter still has a 'to' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(FILTERS.PLAYERS.DATE_RANGE)
      }
    },
    clearFilterDateRangeTo () {
      this.dateTo = null

      const dateRange = this.filters.find(f => f.name === FILTERS.PLAYERS.DATE_RANGE)
      delete dateRange.to

      if (dateRange.hasOwnProperty('from')) {
        // the date range filter still has a 'from' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(FILTERS.PLAYERS.DATE_RANGE)
      }
    },
    clearFilterFormat () {
      this.format = null

      this.removeFilter(FILTERS.PLAYERS.FORMAT)
    },
    onChangeDateFrom (value) {
      let dateRange = this.filters.find(f => f.name === FILTERS.PLAYERS.DATE_RANGE)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'from' date.
        dateRange.from = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: FILTERS.PLAYERS.DATE_RANGE, from: value }
      }
      this.updateFilter(dateRange)
    },
    onChangeDateTo (value) {
      let dateRange = this.filters.find(f => f.name === FILTERS.PLAYERS.DATE_RANGE)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'to' date.
        dateRange.to = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: FILTERS.PLAYERS.DATE_RANGE, to: value }
      }
      this.updateFilter(dateRange)
    },
    onChangeFormat (value) {
      this.updateFilter({ name: FILTERS.PLAYERS.FORMAT, value })
    },
    onSaveDateFrom () {
      this.$refs.fromDateMenu.save(this.dateFrom)
      this.onChangeDateFrom(this.dateFrom)
    },
    onSaveDateTo () {
      this.$refs.toDateMenu.save(this.dateTo)
      this.onChangeDateTo(this.dateTo)
    }
  }
}
</script>
