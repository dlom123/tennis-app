<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">

      <v-chip
        v-if="isFilterSet(filterTeamFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterTeamFormat) }}</v-chip>

      <v-chip
        v-if="isFilterSet(filterTeamYear)"
        close
        @click:close="clearFilterYear"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterTeamYear) }}</v-chip>

    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderTeam',
  computed: {
    ...mapGetters([
      'getFilterValueByName'
    ]),
    filterTeamFormat() {
      return FILTERS.TEAM.FORMAT
    },
    filterTeamYear() {
      return FILTERS.TEAM.YEAR
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
    ]),
    clearFilterFormat() {
      this.removeFilter(this.filterTeamFormat)
    },
    clearFilterYear() {
      this.removeFilter(this.filterTeamYear)
    },
    isFilterSet(filterName) {
      return !!this.getFilterValueByName(filterName)
    }
  }
}
</script>
