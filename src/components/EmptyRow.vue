<template>
  <v-row no-gutters class="pa-4 white">
    <v-col cols="12" align="center">
      <p class="text-info ma-0">{{ displayText }}</p>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'emptyRow',
  props: ['text'],
  computed: {
    ...mapState([
      'filters'
    ]),
    displayText() {
      const fullText = [this.text ? this.text : '']
      if (this.filters.filter(f => f.screen === this.$route.name).length) {
        // if there are any filters set for this screen, suggest changing them to see more results
        fullText.push('Try changing some filters to see more results.')
      }

      return fullText.join(' ')
    }
  }
}
</script>
