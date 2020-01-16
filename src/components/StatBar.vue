<template>
  <v-row>
    <v-col cols="12">
      <v-progress-linear
        height="25"
        :value="statPercent"
      >
        <p v-if="showPercent" @click="toggleShowPercent">{{ statPercent }}%</p>
        <p v-else @click="toggleShowPercent">{{ statRatio }}</p>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'statBar',
  props: ['stat', 'showPercent', 'toggleShowPercent'],
  computed: {
    statPercent() {
      return Math.round(this.stat.in / this.stat.of * 100)
    },
    statRatio() {
      return `${this.stat.in}/${this.stat.of}`
    }
  }
}
</script>
