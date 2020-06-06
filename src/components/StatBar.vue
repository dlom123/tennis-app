<template>
  <v-row>
    <v-col cols="12">
      <v-progress-linear
        height="25"
        :value="statPercent"
        @click="toggleShowPercent"
      >
        <span v-if="showPercent">{{ statPercent }}%</span>
        <span v-else>{{ statRatio }}</span>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
import { getPercentage } from '@/utils/functions'

export default {
  name: 'statBar',
  props: ['stat', 'showPercent', 'toggleShowPercent'],
  computed: {
    statPercent() {
      return getPercentage(this.stat.value.in, this.stat.value.of)
    },
    statRatio() {
      return `${this.stat.value.in}/${this.stat.value.of}`
    }
  }
}
</script>
