<template>
  <v-expansion-panel>

    <v-expansion-panel-header color="primary">
      <v-row no-gutters>
        <v-col cols="2">
          <h2 class="white--text">Matches</h2>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="pt-2">
      <v-row no-gutters>
        <v-col cols="12">
          <v-data-table
            :headers="isViewSingles ? headersSingles : headersDoubles"
            :items="isViewSingles ? itemsSingles : itemsDoubles"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import moment from 'moment'

export default {
  name: 'playerMatches',
  props: ['matches', 'view'],
  data() {
    return {
      formatMatchDate: 'M/DD/YYYY',
      headersDoubles: [
        { text: 'Date', value: 'date' },
        { text: 'Location', value: 'location' },
        { text: 'Partner', value: 'partner' },
        { text: 'Opponents', value: 'opponents' }
      ],
      headersSingles: [
        { text: 'Date', value: 'date' },
        { text: 'Location', value: 'location' },
        { text: 'Opponent', value: 'opponent' }
      ]
    }
  },
  computed: {
    isViewSingles() {
      return this.view !== 'doubles'
    },
    itemsDoubles() {
      const matches = this.matches.filter(match => match.type === 'doubles')
      const items = matches.map(match => {
        const opponentsFormatted = match.opponent.map(opponent => `${opponent.firstName} ${opponent.lastName}`)

        return {
          date: moment(match.date).format(this.formatMatchDate),
          location: match.location,
          partner: `${match.team[1].firstName} ${match.team[1].lastName}`,
          opponents: `${opponentsFormatted[0]}/${opponentsFormatted[1]}`
        }
      })

      return items
    },
    itemsSingles() {
      const matches = this.matches.filter(match => match.type === 'singles')

      const items = matches.map(match => {
        return {
          date: moment(match.date).format(this.formatMatchDate),
          location: match.location,
          opponent: `${match.opponent.firstName} ${match.opponent.lastName}`
        }
      })

      return items
    }
  }
}
</script>
