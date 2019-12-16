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

      <v-chip
        v-if="isFilterSet(filterYear)"
        close
        @click:close="clearFilterYear"
        class="chip-header"
      >Format: {{ getFilterValueByName(filterYear) }}</v-chip>

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
      'getFilterValue'
    ]),
    filterFormat() {
      return FILTERS.FORMAT
    },
    filterYear() {
      return FILTERS.YEAR
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
    ]),
    clearFilterFormat() {
      this.removeFilter({ screen: this.$route.name, name: this.filterFormat })
    },
    clearFilterYear() {
      this.removeFilter({ screen: this.$route.name, name: this.filterYear })
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
