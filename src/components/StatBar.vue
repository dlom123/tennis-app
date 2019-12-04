<template>
  <v-row>
    <v-col cols="12">
      <v-progress-linear
        height="25"
        :value="statPercent"
      >
        <strong v-if="showPercent" @click="toggleShowPercent">{{ statPercent }}%</strong>
        <strong v-else @click="toggleShowPercent">{{ statRatio }}</strong>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'statBar',
  props: ['stat', 'showPercent', 'toggleShowPercent'],
  computed: {
    statPercent () {
      return Math.round(this.stat.in / this.stat.of * 100)
    },
    statRatio () {
      return `${this.stat.in}/${this.stat.of}`
    }
  }
}
</script>
