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
          <v-radio
            v-if="isDoubles"
            label="mixed"
            value="mixed"
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
  name: 'filterFormat',
  props: ['isDoubles'],
  computed: {
    ...mapGetters([
      'getFilterValue'
    ]),
    filterValue() {
      return this.getFilterValue({ screen: this.$route.name, name: FILTERS.FORMAT })
    }
  },
  methods: {
    ...mapMutations([
      'updateFilter'
    ]),
    onChangeFormat(value) {
      this.updateFilter({ screen: this.$route.name, name: FILTERS.FORMAT, value })
    }
  }
}
</script>

<style scoped lang="sass">
.filter-body
  padding-bottom: 0
</style>
