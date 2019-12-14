<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">
      <v-chip
        v-if="isFilterSet(filterLeaderboardFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterLeaderboardFormat) }}</v-chip>
    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderLeaderboard',
  computed: {
    ...mapGetters([
      'getFilterValueByName'
    ]),
    filterLeaderboardFormat() {
      return FILTERS.LEADERBOARD.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
    ]),
    clearFilterFormat() {
      this.removeFilter(this.filterLeaderboardFormat)
    },
    isFilterSet(filterName) {
      return !!this.getFilterValueByName(filterName)
    }
  }
}
</script>
