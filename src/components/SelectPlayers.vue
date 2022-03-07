<template>
  <v-autocomplete
    ref="selectPlayers"
    :label="label ? label : ''"
    placeholder="Select players..."
    :items="itemsPlayers"
    :dense="dense ? dense : $vuetify.breakpoint.xsOnly"
    item-text="fullName"
    item-value="id"
    clearable
    outlined
    hide-selected
    hide-details
    background-color="white"
    @change="onChangeSelectPlayer"
  >
    <template v-slot:item="data">
      <template>
        <v-list-item-avatar>
          <v-img
            :src="
              require(`../assets/images/headshots/${
                data.item.gender === 'm' ? 'men' : 'women'
              }/silhouette.png`)
            "
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.fullName"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getPlayerFullName } from '@/utils/functions'

export default {
  name: 'selectPlayers',
  props: ['dense', 'label'],
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
    }
  },
  methods: {
    ...mapMutations([
      'addSelectedPlayer'
    ]),
    getPlayerFullName,
    onChangeSelectPlayer(value) {
      if (value) {
        const player = this.players.find(player => player.id === value)
        this.addSelectedPlayer(player)
        this.$refs.selectPlayers.reset()
      }
    }
  }
}
</script>
