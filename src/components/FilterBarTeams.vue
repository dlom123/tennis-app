<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderTeams
          :clearFilterDateRange="clearFilterDateRange"
          :clearFilterFormat="clearFilterFormat"
        />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="4">Format</v-col>
            <v-col sm="4">Date Range</v-col>
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
            <v-col sm="4">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-menu
                    ref="fromDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dateFrom"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFrom"
                        label="From"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        clearable
                        @click:clear="clearFilterDateRangeFrom"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateFrom"
                      no-title
                      scrollable
                      first-day-of-week="1"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.fromDateMenu.isActive = false"
                      >Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="onSaveDateFrom"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-menu
                    ref="toDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dateTo"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateTo"
                        label="To"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        clearable
                        @click:clear="clearFilterDateRangeTo"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateTo"
                      no-title
                      scrollable
                      first-day-of-week="1"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.toDateMenu.isActive = false"
                      >Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="onSaveDateTo"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterBarHeaderTeams from './FilterBarHeaderTeams.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'filterBarTeams',
  components: {
    FilterBarHeaderTeams
  },
  data () {
    return {
      dateFrom: null,
      dateTo: null,
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
    clearFilterDateRange () {
      this.dateFrom = null
      this.dateTo = null

      this.removeFilter(FILTERS.TEAMS.DATE_RANGE)
    },
    clearFilterDateRangeFrom () {
      this.dateFrom = null

      const dateRange = this.filters.find(f => f.name === FILTERS.TEAMS.DATE_RANGE)
      delete dateRange.from
      if (dateRange.hasOwnProperty('to')) {
        // the date range filter still has a 'to' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(FILTERS.TEAMS.DATE_RANGE)
      }
    },
    clearFilterDateRangeTo () {
      this.dateTo = null

      const dateRange = this.filters.find(f => f.name === FILTERS.TEAMS.DATE_RANGE)
      delete dateRange.to

      if (dateRange.hasOwnProperty('from')) {
        // the date range filter still has a 'from' value to keep
        this.updateFilter(dateRange)
      } else {
        // there are no more values set on this filter...remove it
        this.removeFilter(FILTERS.TEAMS.DATE_RANGE)
      }
    },
    clearFilterFormat () {
      this.format = null

      this.removeFilter(FILTERS.TEAMS.FORMAT)
    },
    onChangeDateFrom (value) {
      let dateRange = this.filters.find(f => f.name === FILTERS.TEAMS.DATE_RANGE)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'from' date.
        dateRange.from = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: FILTERS.TEAMS.DATE_RANGE, from: value }
      }
      this.updateFilter(dateRange)
    },
    onChangeDateTo (value) {
      let dateRange = this.filters.find(f => f.name === FILTERS.TEAMS.DATE_RANGE)
      if (dateRange) {
        // Date range filter is already set. Update it with new 'to' date.
        dateRange.to = value
      } else {
        // Date range filter is not already set. Create it.
        dateRange = { name: FILTERS.TEAMS.DATE_RANGE, to: value }
      }
      this.updateFilter(dateRange)
    },
    onChangeFormat (value) {
      this.updateFilter({ name: FILTERS.TEAMS.FORMAT, value })
    },
    onSaveDateFrom () {
      this.$refs.fromDateMenu.save(this.dateFrom)
      this.onChangeDateFrom(this.dateFrom)
    },
    onSaveDateTo () {
      this.$refs.toDateMenu.save(this.dateTo)
      this.onChangeDateTo(this.dateTo)
    }
  }
}
</script>
