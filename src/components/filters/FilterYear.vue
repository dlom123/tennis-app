<template>
  <v-container fluid class="filter-body">
    <v-row no-gutters>

      <v-col sm="12">Year</v-col>

      <v-col sm="12">
        <v-row no-gutters>
          <v-col cols="4">
            <v-select
              hide-details
              dense
              outlined
              :items="optionsYears"
              @change="onChangeYear"
              value="all"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'filterYear',
  props: ['filterName'],
  computed: {
    optionsYears() {
      // generate the year options based on stats data and the current year
      const firstYear = new Date().getFullYear() - 2 // TODO: replace this with the actual first year from stats data
      const currentYear = new Date().getFullYear()
      const years = new Array(currentYear - firstYear + 1).fill().map((y, i) => currentYear - i)

      const options = [{ text: 'All', value: 'all' }]
      years.forEach(year => {
        options.push({ text: year, value: year })
      })

      return options
    }
  },
  methods: {
    ...mapMutations([
      'updateFilter'
    ]),
    onChangeFormat(value) {
      this.updateFilter({ screen: this.$route.name, name: this.filterName, value })
    }
  }
}
</script>

<style scoped lang="sass">
.filter-body
  padding-bottom: 0
</style>
