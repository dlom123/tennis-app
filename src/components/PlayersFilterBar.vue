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
                v-model="filterType"
                :label="filterType.toString()"
                true-value="doubles"
                false-value="singles"
              ></v-switch>
            </v-col>
            <v-col sm="4">
              <v-radio-group v-model="filterFormat">
                <v-radio
                  label="mixed"
                  value="mixed"
                />
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
            <v-col sm="4">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-menu
                    ref="fromDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dateRange.from"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateRange.from"
                        label="From date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
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
                        @click="$refs.fromDateMenu.save(date)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="4">
                  <v-menu
                    ref="toDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dateRange.to"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateRange.to"
                        label="To date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
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
                        @click="$refs.toDateMenu.save(date)"
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
export default {
  name: 'playersFilterBar',
  data () {
    return {
      date: null,
      dateRange: {
        from: null,
        to: null
      },
      filterFormat: 'mixed',
      filterType: 'doubles'
    }
  }
}
</script>
