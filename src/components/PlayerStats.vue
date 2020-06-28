<template>
  <v-expansion-panel>

    <v-expansion-panel-header color="primary">
      <v-row no-gutters>
        <v-col>
          <h2 class="white--text">Player Stats</h2>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="py-3">

      <v-row no-gutters class="stats-top pt-3 pb-2">
        <!-- <v-col v-for="stat in statsSimple" :key="stat.name" cols="6" align="center"> -->
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Match Win %</h3>
          <p>10/12 (50%)</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Sets Played</h3>
          <p>36</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Tiebreaker Win %</h3>
          <p>3/5 (60%)</p>
        </v-col>
        <v-col cols="6" align="center">
          <h3 class="text-capitalize">Games Played</h3>
          <p>360</p>
        </v-col>
      </v-row>

      <!-- <v-row no-gutters>
        <v-col v-for="stat in statsPercentages" :key="stat.name" cols="12">
          <h3 class="text-capitalize">{{ stat.name }}</h3>
          <StatBar :stat="stat" :showPercent="showPercent" :toggleShowPercent="toggleShowPercent" />
        </v-col>
      </v-row> -->

    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import StatBar from '@/components/StatBar'

export default {
  name: 'playerStats',
  components: {
    StatBar
  },
  props: ['stats', 'view'],
  data() {
    return {
      showPercent: true
    }
  },
  computed: {
    statsDoubles() {
      // TODO: filter stats by view type (singles/doubles) using 'view' prop
      return this.stats
    },
    statsPercentages() {
      return this.stats.filter(stat => typeof stat.value === 'object')
    },
    statsSimple() {
      return this.stats.filter(stat => typeof stat.value === 'number')
    },
    statsSingles() {
      // TODO: filter stats by view type (singles/doubles) using 'view' prop
      return this.stats
    }
  },
  methods: {
    toggleShowPercent() {
      this.showPercent = !this.showPercent
    }
  }
}
</script>
