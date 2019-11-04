<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Filters</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col sm="4">Type</v-col>
            <v-col sm="4">Format</v-col>
            <v-col sm="4">Date Range</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="4">
              <v-switch
                v-model="matchType"
                :label="matchType.toString()"
                true-value="doubles"
                false-value="singles"
              ></v-switch>
            </v-col>
            <v-col sm="4">two</v-col>
            <v-col sm="4">
              <v-row no-gutters>
                <v-col cols="6">From</v-col>
                <v-col cols="6">To</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="4">Rating</v-col>
            <v-col sm="4">Surface</v-col>
            <v-col sm="4">Setting</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col sm="4">four</v-col>
            <v-col sm="4">five</v-col>
            <v-col sm="4">six</v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'playersFilterBar',
  data () {
    return {
      matchType: 'singles'
    }
  }
}
</script>
