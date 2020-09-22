<template>
  <v-container fluid class="px-0 pb-0">

    <v-row class="mx-0">
      <v-col cols="12" class="blue white--text">
        <h2>{{ tournament.name }}</h2>
      </v-col>
    </v-row>

    <v-row no-gutters class="pt-2 pl-2 mb-4">
      <v-col cols="12"><em>{{ tournament.location.city }}, {{ tournament.location.state }}</em></v-col>
      <v-col><em>{{ tournament.location.name }}</em></v-col>
    </v-row>

    <v-row no-gutters class="pt-2 pl-2">
      <v-col><h3>Format</h3></v-col>
      <v-col></v-col>
    </v-row>

    <v-row no-gutters class="pl-2">
      <v-col>{{ tournament.format }}</v-col>
      <v-col></v-col>
    </v-row>

  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'tournamentDetails',
  props: ['tournament'],
  data() {
    return {
      formatTournamentDate: 'dddd, MMMM Do YYYY'
    }
  },
  computed: {
    displayTournamentDate() {
      return moment.parseZone(this.tournament.date).format(this.formatTournamentDate)
    }
  }
}
</script>
