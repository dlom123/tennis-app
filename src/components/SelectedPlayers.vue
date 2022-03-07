<template>
  <v-list subheader :dense="dense">
    <v-subheader>{{ numSelectedPlayersText }}</v-subheader>

    <v-list-item v-for="player in selectedPlayers" :key="player.id">
      <v-list-item-avatar>
        <v-img
          :src="
            require(`../assets/images/headshots/${
              player.gender === 'm' ? 'men' : 'women'
            }/silhouette.png`)
          "
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-text="getPlayerFullName(player)"
        ></v-list-item-title>
      </v-list-item-content>

      <v-list-item-icon @click="onClickRemovePlayer(player.id)">
        <v-icon>mdi-close</v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getPlayerFullName } from '@/utils/functions'

export default {
  name: 'selectPlayer',
  props: ['dense'],
  computed: {
    ...mapState([
      'players',
      'selectedPlayers'
    ]),
    itemsPlayers() {
      const players = this.players.filter(player => !this.selectedPlayers.includes(player))
        .map(player => {
          return {
            ...player,
            fullName: this.getPlayerFullName(player)
          }
        })
      return players
    },
    numSelectedPlayersText() {
      const numSelected = this.selectedPlayers.length
      return `${numSelected || 'No '} player${numSelected !== 1 ? 's' : ''} selected`
    }
  },
  methods: {
    ...mapMutations([
      'removeSelectedPlayer'
    ]),
    getPlayerFullName,
    onClickRemovePlayer(playerId) {
      this.removeSelectedPlayer(playerId)
    },
  }
}
</script>
