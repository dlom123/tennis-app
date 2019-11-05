<template>
  <v-row no-gutters align="center">
    <v-col cols="1">Filters</v-col>
    <v-col cols="1" v-if="isFilterSet('playersType') && getFilterValue('playersType') !== defaultType">
      <v-chip
        close
        @click:close="clearFilterType"
      >Type: {{ getFilterValue('playersType') }}</v-chip>
    </v-col>
    <v-col cols="1" v-if="isFilterSet('playersFormat')">
      <v-chip
        close
        @click:close="clearFilterFormat"
      >Format: {{ getFilterValue('playersFormat') }}</v-chip>
    </v-col>
    <v-col cols="2" v-if="isFilterSet('playersDateRange')">
      <v-chip
        close
        @click:close="clearFilterDateRange"
      >Date Range: {{ getDateRangeValue('playersDateRange') }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

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
    ])
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
