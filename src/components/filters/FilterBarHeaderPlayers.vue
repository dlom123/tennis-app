<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">
      <v-chip
        v-if="isFilterSet(filterFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterFormat) }}</v-chip>
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
import { mapGetters, mapMutations, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderPlayers',
  data() {
    return {
      sortOptions: [
        { text: 'Last Name', value: 'name' },
        { text: 'Rank', value: 'rank' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    ...mapState([
      'filters'
    ]),
    filterFormat() {
      return FILTERS.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter',
      'setSort'
    ]),
    clearFilterFormat() {
      this.removeFilter({ screen: this.$route.name, name: this.filterFormat })
    },
    getFilterValueByName(filterName) {
      return this.getFilterValue({ screen: this.$route.name, name: filterName })
    },
    isFilterSet(filterName) {
      return !!this.getFilterValueByName(filterName)
    }
  }
}
</script>
