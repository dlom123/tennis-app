<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="9">
      <v-chip
        v-if="isFilterSet(filterTeamsFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterByName(filterTeamsFormat) }}</v-chip>
    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarHeaderTeams',
  props: [
    'clearFilterFormat'
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
    ...mapGetters([
      'getFilterByName'
    ]),
    ...mapState([
      'filters'
    ]),
    filterTeamsFormat () {
      return FILTERS.TEAMS.FORMAT
    }
  },
  methods: {
    isFilterSet (filterName) {
      return this.getFilterByName(filterName).length
    }
  }
}
</script>
