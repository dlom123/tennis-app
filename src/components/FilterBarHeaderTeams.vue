<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="9">
      <v-chip
        v-if="isFilterSet(filterTeamsFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValue(filterTeamsFormat) }}</v-chip>
      <v-chip
        v-if="isFilterSet(filterTeamsDateRange)"
        close
        @click:close="clearFilterDateRange"
        class="chip-header"
      >Date Range: {{ getDateRangeValue(filterTeamsDateRange) }}</v-chip>
    </v-col>

  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderTeams',
  props: [
    'clearFilterDateRange',
    'clearFilterFormat',
    'clearFilterType',
    'defaultType'
  ],
  data () {
    return {
      sortOptions: [
        { text: 'Last Name', value: 'name' },
        { text: 'Rank', value: 'rank' }
      ]
    }
  },
  computed: {
    ...mapState([
      'filters'
    ]),
    filterTeamsDateRange () {
      return FILTERS.TEAMS.DATE_RANGE
    },
    filterTeamsFormat () {
      return FILTERS.TEAMS.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter',
      'setSort'
    ]),
    getDateRangeValue (filterName) {
      const f = this.filters.find(f => f.name === filterName)
      let dateRangeText

      if (!f.from && f.to) {
        dateRangeText = `through ${f.to}`
      } else if (f.from && !f.to) {
        dateRangeText = `from ${f.from}`
      } else {
        dateRangeText = `${f.from} - ${f.to}`
      }

      return dateRangeText
    },
    getFilterValue (filterName) {
      const f = this.filters.find(f => f.name === filterName)

      return f.value
    },
    isFilterSet (filterName) {
      return this.filters.filter(f => f.name === filterName).length
    }
  }
}
</script>
