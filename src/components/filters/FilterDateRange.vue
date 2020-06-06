<template>
  <v-container fluid class="filter-body">
    <v-row no-gutters>

      <v-col sm="12">Date Range</v-col>

      <v-col sm="12"></v-col>

    </v-row>
  </v-container>
</template>

<script>
// TODO: This component is incomplete and broken. Fix it, if needed.
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'filterDateRange',
  props: ['filterName'],
  computed: {
    ...mapState([
      'filters'
    ])
  },
  methods: {
    ...mapMutations([
      'removeFilter',
      'updateFilter'
    ]),
    clearFilterDateRange() {
      this.removeFilter(this.filterName)
    },
    clearFilterDateRangeFrom() {
      this.dateFrom = null

      const dateRange = this.filters.find(f => f.name === this.filterName)
      delete dateRange.from
      if (dateRange.hasOwnProperty('to')) {
        // the date range filter still has a 'to' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(this.filterName)
      }
    },
    clearFilterDateRangeTo() {
      this.dateTo = null

      const dateRange = this.filters.find(f => f.name === this.filterName)
      delete dateRange.to

      if (dateRange.hasOwnProperty('from')) {
        // the date range filter still has a 'from' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(this.filterName)
      }
    },
    onChangeFormat(value) {
      this.updateFilter({ name: this.filterName, value })
    },
    onChangeDateFrom(value) {
      let dateRange = this.filters.find(f => f.name === this.filterName)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'from' date.
        dateRange.from = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: this.filterName, from: value }
      }
      this.updateFilter(dateRange)
    },
    onChangeDateTo(value) {
      let dateRange = this.filters.find(f => f.name === this.filterName)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'to' date.
        dateRange.to = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: this.filterName, to: value }
      }
      this.updateFilter(dateRange)
    },
    onSaveDateFrom() {
      this.$refs.fromDateMenu.save(this.dateFrom)
      this.onChangeDateFrom(this.dateFrom)
    },
    onSaveDateTo() {
      this.$refs.toDateMenu.save(this.dateTo)
      this.onChangeDateTo(this.dateTo)
    }
  }
}
</script>
