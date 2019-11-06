<template>
  <v-row no-gutters align="center">
    <v-col cols="1">Filters</v-col>
    <v-col cols="1" v-if="isFilterSet(filterPlayersType) && getFilterValue(filterPlayersType) !== defaultType">
      <v-chip
        close
        @click:close="clearFilterType"
      >Type: {{ getFilterValue(filterPlayersType) }}</v-chip>
    </v-col>
    <v-col cols="1" v-if="isFilterSet(filterPlayersFormat)">
      <v-chip
        close
        @click:close="clearFilterFormat"
      >Format: {{ getFilterValue(filterPlayersFormat) }}</v-chip>
    </v-col>
    <v-col cols="2" v-if="isFilterSet(filterPlayersDateRange)">
      <v-chip
        close
        @click:close="clearFilterDateRange"
      >Date Range: {{ getDateRangeValue(filterPlayersDateRange) }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'playersFilterBarHeader',
  props: [
    'clearFilterDateRange',
    'clearFilterFormat',
    'clearFilterType',
    'defaultType'
  ],
  computed: {
    ...mapState([
      'filters'
    ]),
    filterPlayersDateRange () {
      return FILTERS.PLAYERS.DATE_RANGE
    },
    filterPlayersFormat () {
      return FILTERS.PLAYERS.FORMAT
    },
    filterPlayersType () {
      return FILTERS.PLAYERS.TYPE
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
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
