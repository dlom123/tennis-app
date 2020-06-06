<template>
  <v-container fluid class="filter-body pa-0">
    <v-row no-gutters>

      <v-col cols="12">
        <h4>Gender</h4>
      </v-col>

      <v-col cols="12">
        <v-radio-group
          :row="$vuetify.breakpoint.smAndDown"
          class="filter-radio mt-1"
          hide-details
          dense
          :value="filterValue"
          @change="onChangeGender">
          <v-radio
            label="male"
            value="male"
          />
          <v-radio
            label="female"
            value="female"
          />
        </v-radio-group>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterGender',
  props: [
    'screenOverride' // specify a route name with which to share filter state (e.g., Leaderboard + Stat)
  ],
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    filterValue() {
      return this.getFilterValue({ screen: this.screenName, name: FILTERS.GENDER })
    },
    screenName() {
      return this.screenOverride ? this.screenOverride : this.$route.name
    }
  },
  methods: {
    ...mapMutations([
      'updateFilter'
    ]),
    onChangeGender(value) {
      this.updateFilter({ screen: this.screenName, name: FILTERS.GENDER, value })
    }
  }
}
</script>

<style scoped lang="sass">
.filter-radio
  .v-label
    font-size: 30px
</style>
