<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">

      <v-chip
        v-if="isFilterSet(filterPlayerFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterPlayerFormat) }}</v-chip>

      <v-chip
        v-if="isFilterSet(filterPlayerYear)"
        close
        @click:close="clearFilterYear"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterPlayerYear) }}</v-chip>

    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderPlayer',
  computed: {
    ...mapGetters([
      'getFilterValueByName'
    ]),
    filterPlayerFormat() {
      return FILTERS.PLAYER.FORMAT
    },
    filterPlayerYear() {
      return FILTERS.PLAYER.YEAR
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
    ]),
    clearFilterFormat() {
      this.removeFilter(this.filterPlayerFormat)
    },
    clearFilterYear() {
      this.removeFilter(this.filterPlayerYear)
    },
    isFilterSet(filterName) {
      return !!this.getFilterValueByName(filterName)
    }
  }
}
</script>
