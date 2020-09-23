<template>
  <v-container fluid class="px-0 pb-0">

    <v-row class="mx-0">
      <v-col cols="12" class="blue white--text">
        <h2>{{ tournament.name }}</h2>
      </v-col>
    </v-row>

    <v-row class="mx-0">
      <v-col cols="12">
        <h3>Players</h3>
      </v-col>
    </v-row>

    <v-row v-for="(players, letter) in playersAlphabetized" :key="letter" class="mx-0">
      <v-col cols="12" class="pa-0">
        <v-list subheader class="pb-6">
          <v-subheader><h4><strong>{{ letter.toUpperCase() }}</strong></h4></v-subheader>

          <v-list-item
            v-for="(player, i) in players"
            :key="player.id"
            dense
            :class="{ 'grey lighten-3': !(i % 2) }"
            :to="{ name: 'player', params: { playerId: player.id }}"
          >
            <v-list-item-avatar>
              <v-img
                :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="getDisplayName(player)"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { sortPlayers } from '@/utils/functions'

export default {
  name: 'tournamentPlayers',
  props: ['tournament'],
  computed: {
    numPlayersText() {
      const numPlayers = this.tournament.players.length
      return `${numPlayers || 'No '} player${numPlayers !== 1 ? 's' : ''}`
    },
    playersAlphabetized() {
      const letters = {}
      const sortedPlayers = sortPlayers(this.tournament.players)
      sortedPlayers.forEach(player => {
        const letter = player.lastName[0].toLowerCase()
        if (!(letter in letters)) {
          letters[letter] = [player]
        } else {
          letters[letter].push(player)
        }
      })
      return letters
    }
  },
  methods: {
    getDisplayName(player) {
      return `${player.lastName}, ${player.firstName}`
    }
  }
}
</script>
