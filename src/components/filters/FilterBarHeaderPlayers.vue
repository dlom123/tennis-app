<template>
  <v-row no-gutters align="center">

    <v-col cols="1">Filters</v-col>

    <v-col cols="8">
      <v-chip
        v-if="isFilterSet(filterPlayersFormat)"
        close
        @click:close="clearFilterFormat"
        class="chip-header"
      >Format: {{ getFilterByName(filterPlayersFormat) }}</v-chip>
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
    filterPlayersFormat () {
      return FILTERS.PLAYERS.FORMAT
    }
  },
  methods: {
    ...mapMutations([
      'setSort'
    ]),
    isFilterSet (filterName) {
      return this.getFilterByName(filterName).length
    }
  }
}
</script>
