<template>
  <v-container fluid class="filter-body">
    <v-row no-gutters>

      <v-col sm="12">Format</v-col>

      <v-col sm="12">
        <v-radio-group :value="filterValue" @change="onChangeFormat">
          <v-radio
            label="men"
            value="men"
          />
          <v-radio
            label="women"
            value="women"
          />
        </v-radio-group>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'filterFormat',
  props: ['filterName'],
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    filterValue() {
      return this.getFilterValue({ screen: this.$route.name, name: this.filterName })
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
