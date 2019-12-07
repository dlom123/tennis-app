<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="9">
      <v-chip
        v-if="isFilterSet(filterTeamsFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterTeamsFormat) }}</v-chip>
    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderTeams',
  computed: {
    ...mapGetters([
      'getFilterValueByName'
    ]),
    ...mapState([
      'filters'
    ]),
    filterTeamsFormat () {
      return FILTERS.TEAMS.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
    ]),
    clearFilterFormat () {
      this.removeFilter(this.filterTeamsFormat)
    },
    isFilterSet (filterName) {
      return !!this.getFilterValueByName(filterName)
    }
  }
}
</script>
