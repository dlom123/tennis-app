<template>
  <v-card
    outlined
    class="mb-2 pb-2"
    :to="{ name: 'tournament', params: { tournamentId: tournament.id } }"
  >
    <v-row no-gutters class="mb-3">
      <v-col>
        <v-row no-gutters class="blue white--text">
          <v-col class="px-2 pt-1"><h2>{{ tournament.name }}</h2></v-col>
        </v-row>
        <v-row no-gutters class="blue white--text font-italic">
          <v-col class="px-2 pb-1">{{ displayTournamentDate }}</v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-3">
      <v-col>

        <v-row no-gutters>
          <v-col cols="4" class="font-weight-bold">Location</v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12">{{ tournament.location.city }}, {{ tournament.location.state }}</v-col>
              <v-col cols="12">{{ tournament.location.name }}</v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-show="tournament.maxPlayers" no-gutters class="mt-2">
          <v-col cols="4" class="body-2">Spots available</v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" class="body-2">{{ tournament.maxPlayers - tournament.players.length }}/{{ tournament.maxPlayers }}</v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'tournamentCard',
  props: ['tournament'],
  data() {
    return {
      formatTournamentDate: 'dddd, MMMM Do YYYY'
    }
  },
  computed: {
    ...mapState([
      'view'
    ]),
    displayTournamentDate() {
      return moment.parseZone(this.tournament.date).format(this.formatTournamentDate)
    }
  }
}
</script>
