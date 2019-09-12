<template>
  <v-container fluid class="container-player-stats">

    <v-toolbar dark dense :class="['toolbar-player-stats', classToolbar]">
      <v-btn icon dark @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="toolbar-player-name">{{playerName}}</v-toolbar-title>
    </v-toolbar>

    <v-row class="row-player-stats">

      <v-col class="col-left">
        PHOTO
      </v-col>

      <v-col class="col-right">
        STATS
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'playerStats',
  props: ['player'],
  computed: {
    classToolbar () {
      return this.player &&
        this.player.gender === 'm' ? 'men' : 'women'
    },
    playerName () {
      return this.player ? `${this.player.firstName} ${this.player.lastName}` : ''
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentPlayer',
      'setShowPlayerDialog'
    ]),
    closeDialog () {
      this.setShowPlayerDialog(false)
      this.setCurrentPlayer(null)
    }
  }
}
</script>
