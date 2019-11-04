<template>
  <v-container fluid>
    <PlayersFilterBar/>

    <v-row v-for="player in players" :key="player.id" style="border-bottom: 2px solid #eee;">
      <PlayerRow :player="player"/>
    </v-row>
  </v-container>
</template>

<script>
import PlayerRow from '../components/PlayerRow.vue'
import PlayersFilterBar from '../components/PlayersFilterBar.vue'

export default {
  name: 'home',
  components: {
    PlayerRow,
    PlayersFilterBar
  },
  data () {
    return {
      test: false,
      players: [
        { id: 1, firstName: 'Doug', lastName: 'Brown', gender: 'm', avatarUrl: '' },
        { id: 2, firstName: 'Andrea', lastName: 'Burkhardt', gender: 'f', avatarUrl: '' },
        { id: 3, firstName: 'Alex', lastName: 'Fohl', gender: 'm', avatarUrl: '' },
        { id: 4, firstName: 'Chris', lastName: 'Layton', gender: 'm', avatarUrl: '' },
        { id: 5, firstName: 'Maddie', lastName: 'Lee', gender: 'f', avatarUrl: '' },
        { id: 6, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', avatarUrl: '' },
        { id: 7, firstName: 'Dax', lastName: 'McNaught', gender: 'f', avatarUrl: '' },
        { id: 9, firstName: 'Dan', lastName: 'Somers', gender: 'm', avatarUrl: '' },
        { id: 10, firstName: 'Heidi', lastName: 'Somers', gender: 'f', avatarUrl: '' },
        { id: 11, firstName: 'David', lastName: 'Strom', gender: 'm', avatarUrl: '' },
        { id: 12, firstName: 'Emily', lastName: 'Wandel', gender: 'f', avatarUrl: '' },
        { id: 13, firstName: 'Tony', lastName: 'Winkler', gender: 'm', avatarUrl: '' }
      ]
    }
  }
}
</script>
