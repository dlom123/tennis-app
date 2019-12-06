<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderTeams
          :clearFilterFormat="clearFilterFormat"
        />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="4">Format</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="4">
              <v-radio-group v-model="format" @change="onChangeFormat">
                <v-radio
                  label="men"
                  value="men"
                />
                <v-radio
                  label="women"
                  value="women"
                />
                <v-radio
                  label="mixed"
                  value="mixed"
                />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterBarHeaderTeams from '@/components/filters/FilterBarHeaderTeams.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarTeams',
  components: {
    FilterBarHeaderTeams
  },
  data () {
    return {
      format: null
    }
  },
  computed: {
    ...mapState([
      'filters'
    ])
  },
  methods: {
    ...mapMutations([
      'removeFilter',
      'updateFilter'
    ]),
    clearFilterFormat () {
      this.format = null

      this.removeFilter(FILTERS.TEAMS.FORMAT)
    },
    onChangeFormat (value) {
      this.updateFilter({ name: FILTERS.TEAMS.FORMAT, value })
    }
  }
}
</script>
