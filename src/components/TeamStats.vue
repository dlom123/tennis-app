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
              <h2>Team Stats</h2>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row no-gutters class="stats-top">

            <v-col sm="2">
              <v-row>

                <v-col cols="12" align="right">
                  <h3>Aces</h3>
                </v-col>

                <v-col cols="12" align="right">
                  <h3>Winners</h3>
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="4" class="col-stat">
              <v-row>

                <v-col cols="12">
                  <p>22</p>
                </v-col>

                <v-col cols="12">
                  <p>24</p>
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="2">
              <v-row>

                <v-col cols="12" align="right">
                  <h3>Double Faults</h3>
                </v-col>

                <v-col cols="12" align="right">
                  <h3>Unforced Errors</h3>
                </v-col>

              </v-row>
            </v-col>

            <v-col sm="4" class="col-stat">
              <v-row>

                <v-col cols="12">
                  <p>13</p>
                </v-col>

                <v-col cols="12">
                  <p>19</p>
                </v-col>

              </v-row>
            </v-col>

          </v-row>

          <v-row no-gutters>
            <v-col sm="2">

              <v-row>
                <v-col cols="12" align="right">
                  <h3>1st Serve In</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>1st Serve Return</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>2nd Serve Return</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>1st Serve Points Won</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>2nd Serve Points Won</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>Net Points Won</h3>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" align="right">
                  <h3>Break Points Won</h3>
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
  data() {
    return {
      showPercent: true
    }
  },
  methods: {
    toggleShowPercent() {
      this.showPercent = !this.showPercent
    }
  }
}
</script>

<style scoped lang="sass">
.container-stats
  .stats-top
    margin-bottom: 10px
  .col-stat
    padding-left: 15px
</style>
