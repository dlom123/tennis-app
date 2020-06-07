<template>
  <div>

    <v-expansion-panels class="hidden-md-and-up">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row no-gutters align="center">

            <v-col cols="2" class="mr-1">
              <h3>Filters</h3>
            </v-col>

            <v-col v-show="this.filters.length > 0">
              <v-btn
                x-small
                :ripple="false"
                @click.stop="clearFilters"
              >
                clear all
                <v-icon x-small>mdi-close</v-icon>
              </v-btn>
            </v-col>

          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container fluid class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" class="mb-3" v-if="hasFilter(filterFormat)">
                <FilterFormat :isDoubles="isDoubles" :screenOverride="screenOverride" />
              </v-col>
              <v-col cols="12" class="mb-3" v-if="hasFilter(filterGender)">
                <FilterGender :screenOverride="screenOverride" />
              </v-col>
              <v-col cols="4" class="mb-0" v-if="hasFilter(filterRating)">
                <FilterRating :isDoubles="isDoubles" :screenOverride="screenOverride" />
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-container fluid class="hidden-sm-and-down pa-0">
      <v-row no-gutters>
        <v-col v-show="screenHasFiltersSet()">
          <v-btn
            x-small
            :ripple="false"
            @click.stop="clearFilters"
            class="mb-2 white"
          >
            Clear all filters
          </v-btn>
        </v-col>
        <v-col cols="12" class="mb-3" v-if="hasFilter(filterFormat)">
          <FilterFormat :isDoubles="isDoubles" :screenOverride="screenOverride" />
        </v-col>
        <v-col cols="12" class="mb-3" v-if="hasFilter(filterGender)">
          <FilterGender :screenOverride="screenOverride" />
        </v-col>
        <v-col
          cols="7"
          xl="5"
          class="mb-0"
          v-if="hasFilter(filterRating)"
        >
          <FilterRating :isDoubles="isDoubles" :screenOverride="screenOverride" />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import FilterFormat from '@/components/filters/FilterFormat'
import FilterGender from '@/components/filters/FilterGender'
import FilterRating from '@/components/filters/FilterRating'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBar',
  components: {
    FilterFormat,
    FilterGender,
    FilterRating
  },
  props: [
    'isDoubles',
    'screenFilters',
    'screenOverride' // specify a route name with which to share filter state (e.g., Leaderboard + Stat)
  ],
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    ...mapState([
      'filters'
    ]),
    filterFormat() {
      return FILTERS.FORMAT
    },
    filterGender() {
      return FILTERS.GENDER
    },
    filterRating() {
      return FILTERS.RATING
    },
    screenName() {
      return this.screenOverride ? this.screenOverride : this.$route.name
    }
  },
  methods: {
    ...mapMutations([
      'removeAllFiltersByScreen',
      'removeFilter'
    ]),
    clearFilters() {
      this.removeAllFiltersByScreen({ screen: this.screenName })
    },
    clearFilterFormat() {
      this.removeFilter({ screen: this.screenName, name: this.filterFormat })
    },
    clearFilterRating() {
      this.removeFilter({ screen: this.screenName, name: this.filterRating })
    },
    getFilterValueByName(filterName) {
      return this.getFilterValue({ screen: this.screenName, name: filterName })
    },
    hasFilter(filterName) {
      return this.screenFilters.includes(filterName)
    },
    isFilterSet(filterName) {
      return !!this.getFilterValueByName(filterName)
    },
    screenHasFiltersSet() {
      return this.filters.filter(f => f.screen === this.screenName).length > 0
    }
  }
}
</script>
