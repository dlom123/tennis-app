<template>
  <v-container fluid class="filter-body pa-0">
    <v-row no-gutters>

      <v-col cols="12">
        <h4>Rating</h4>
      </v-col>

      <v-col cols="12" class="mt-1">
        <v-select
          hide-details
          dense
          outlined
          background-color="white"
          :items="optionsRatings"
          @change="onChangeRating"
          :value="filterValue"
        ></v-select>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterRating',
  props: ['isDoubles'],
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    filterValue() {
      return this.getFilterValue({ screen: this.$route.name, name: FILTERS.RATING })
    },
    optionsRatings() {
      // TODO: generate the ratings options based on available combined ratings within the teams of players
      const optionsSingles = [
        { text: '3.5', value: '3.5' },
        { text: '4.0', value: '4.0' },
        { text: '4.5', value: '4.5' },
        { text: '5.0', value: '5.0' }
      ]

      const optionsDoubles = [
        { text: '7.0', value: '7.0' },
        { text: '7.5', value: '7.5' },
        { text: '8.0', value: '8.0' },
        { text: '8.5', value: '8.5' },
        { text: '9.0', value: '9.0' },
        { text: '9.5', value: '9.5' }
      ]

      return this.isDoubles ? optionsDoubles : optionsSingles
    }
  },
  methods: {
    ...mapMutations([
      'updateFilter'
    ]),
    onChangeRating(value) {
      this.updateFilter({ screen: this.$route.name, name: FILTERS.RATING, value })
    }
  }
}
</script>
