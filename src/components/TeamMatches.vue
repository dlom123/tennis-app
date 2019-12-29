<template>
  <v-col cols="12" class="container-matches">
    <v-expansion-panels
      multiple
      :value="[0]"
    >
      <v-expansion-panel>

        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="2">
              <h1>Matches</h1>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row no-gutters>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="items"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-col>
</template>

<script>
import moment from 'moment'

export default {
  name: 'teamMatches',
  props: ['matches'],
  data() {
    return {
      formatMatchDate: 'M/DD/YYYY',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Location', value: 'location' },
        { text: 'Opponents', value: 'opponents' }
      ]
    }
  },
  computed: {
    items() {
      const items = this.matches.map(match => {
        const opponentsFormatted = match.opponent.map(opponent => `${opponent.firstName} ${opponent.lastName}`)

        return {
          date: moment(match.date).format(this.formatMatchDate),
          location: match.location,
          opponents: `${opponentsFormatted[0]}/${opponentsFormatted[1]}`
        }
      })

      return items
    }
  }
}
</script>

<style scoped lang="sass">
.container-matches
  padding: 0
</style>
