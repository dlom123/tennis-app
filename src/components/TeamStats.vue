<template>
  <v-col cols="12" class="container-stats">
    <v-expansion-panels
      multiple
      :value="[0]"
    >
      <v-expansion-panel>

        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col sm="12">
              <h1>Team Stats</h1>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row no-gutters class="stats-top">

            <v-col sm="2">
              <v-row>

                <v-col cols="12" align="right">
                  <strong>Aces</strong>
                </v-col>

                <v-col cols="12" align="right">
                  <strong>Winners</strong>
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="4" class="col-stat">
              <v-row>

                <v-col cols="12">
                  22
                </v-col>

                <v-col cols="12">
                  24
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="2">
              <v-row>

                <v-col cols="12" align="right">
                  <strong>Double Faults</strong>
                </v-col>

                <v-col cols="12" align="right">
                  <strong>Unforced Errors</strong>
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="4" class="col-stat">
              <v-row>

                <v-col cols="12">
                  13
                </v-col>

                <v-col cols="12">
                  19
                </v-col>

              </v-row>
            </v-col>

          </v-row>

          <v-row no-gutters>
            <v-col sm="2">

              <v-row>
                <v-col cols="12" align="right">
                  <strong>1st Serve In</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>1st Serve Return</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>2nd Serve Return</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>1st Serve Points Won</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>2nd Serve Points Won</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>Net Points Won</strong>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <strong>Break Points Won</strong>
                </v-col>
              </v-row>

            </v-col>

            <v-col sm="10" class="col-stat">

              <StatBar :stat="stats.firstServeIn" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.firstServeReturn" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.secondServeReturn" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.firstServePointsWon" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.secondServePointsWon" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.netPointsWon" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
              <StatBar :stat="stats.breakPointsWon" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />

            </v-col>
          </v-row>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>
</template>

<script>
import StatBar from '@/components/StatBar'

export default {
  name: 'teamStats',
  components: {
    StatBar
  },
  props: ['stats'],
  data () {
    return {
      showPercent: true
    }
  },
  methods: {
    toggleShowPercent () {
      this.showPercent = !this.showPercent
    }
  }
}
</script>
