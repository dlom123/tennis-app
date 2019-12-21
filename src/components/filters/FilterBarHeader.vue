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

  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeader',
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    filterFormat() {
      return FILTERS.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'removeFilter'
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
