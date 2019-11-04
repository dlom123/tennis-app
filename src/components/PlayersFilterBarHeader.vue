<template>
  <v-row no-gutters align="center">
    <v-col cols="1">Filters</v-col>
    <v-col cols="1" v-if="isFilterSet('playersType')">
      <v-chip close>Type: {{ getFilterValue('playersType') }}</v-chip>
    </v-col>
    <v-col cols="1" v-if="isFilterSet('playersFormat')">
      <v-chip close>Format: {{ getFilterValue('playersFormat') }}</v-chip>
    </v-col>
    <v-col cols="1" v-if="isFilterSet('playersDateRange')">
      <v-chip close>Date Range: {{ dateRange }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'playersFilterBarHeader',
  computed: {
    ...mapState([
      'filters'
    ]),
    dateRange () {
      return 'test'
    }
  },
  methods: {
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
