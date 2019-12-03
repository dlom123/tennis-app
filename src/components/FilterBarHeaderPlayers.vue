<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">
      <v-chip
        v-if="isFilterSet(filterPlayersFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValue(filterPlayersFormat) }}</v-chip>
      <v-chip
        v-if="isFilterSet(filterPlayersDateRange)"
        close
        @click:close="clearFilterDateRange"
        class="chip-header"
      >Date Range: {{ getDateRangeValue(filterPlayersDateRange) }}</v-chip>
    </v-col>

    <!-- <v-col
      cols="auto"
      @click.stop
      class="select-sort"
    >
      <v-select
        hide-details
        dense
        outlined
        label="Sort By"
        :items="sortOptions"
        @change="setSort"
        value="rank"
      ></v-select>
    </v-col> -->

  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderPlayers',
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
    filterPlayersDateRange () {
      return FILTERS.PLAYERS.DATE_RANGE
    },
    filterPlayersFormat () {
      return FILTERS.PLAYERS.FORMAT
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
