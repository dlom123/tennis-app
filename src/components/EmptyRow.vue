<template>
  <v-row no-gutters class="empty-row">
    <v-col sm="12" align="center">
      <p class="text-info">{{ displayText }}</p>
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
        fullText.push('Try removing some filters to see more results.')
      }

      return fullText.join(' ')
    }
  }
}
</script>

<style scoped lang="sass">
.empty-row
  padding: 25px
  font-size: 20px
  color: #888
</style>
