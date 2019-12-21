<template>
  <v-expansion-panels class="filter-bar">
    <v-expansion-panel>
      <v-expansion-panel-header class="header">
        <FilterBarHeaderTeams />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid class="filter-content">
          <v-row no-gutters>
            <v-col sm="4">
              <FilterFormat :isDoubles="true" />
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import FilterBarHeaderTeams from '@/components/filters/FilterBarHeaderTeams'
import FilterFormat from '@/components/filters/FilterFormat'

export default {
  name: 'filterBarTeams',
  components: {
    FilterBarHeaderTeams,
    FilterFormat
  }
}
</script>
