<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>
      <template v-for="player in players">
        <v-col :key="`${player.firstName}${player.lastName}`" xs="2" sm="6" md="4" lg="3">
          <v-card
            class="d-flex justify-center player-card"
            :style="stylePlayerImage(player)"
            tile
            @click.stop="showPlayer(player)"
          >
            <div class="align-self-end player-name" :style="stylePlayerName(player)">
              {{ player.firstName }} {{ player.lastName }}
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <v-dialog
      ref="playerDialog"
      :value="showPlayerDialog"
      light
      @click:outside="closeDialog"
      @keydown.esc="closeDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <PlayerStats :player="currentPlayer" />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import PlayerStats from '@/components/PlayerStats.vue'

export default {
  name: 'players',
  components: { PlayerStats },
  data () {
    return {
      zIndex: 10
    }
  },
  computed: {
    ...mapGetters([
      'isViewingPlayer'
    ]),
    ...mapState([
      'currentPlayer',
      'players',
      'showPlayerDialog'
    ])
  },
  methods: {
    ...mapActions([
      'getPlayers',
      'getStats'
    ]),
    ...mapMutations([
      'setCurrentPlayer',
      'setShowPlayerDialog'
    ]),
    closeDialog () {
      this.setShowPlayerDialog(false)
    },
    async showPlayer (player) {
      await this.getStats({ playerId: player.id })
      this.setCurrentPlayer(player)
      this.setShowPlayerDialog(true)
    },
    stylePlayerImage (player) {
      return {
        'background-image': `url(${require('@/assets/images/headshots/' + player.avatarUrl)})`
      }
    },
    stylePlayerName (player) {
      let textColor
      let bgColor

      if (player.gender === 'm') {
        textColor = '#000000'
        bgColor = '#00b1ef'
      } else {
        textColor = '#ffffff'
        bgColor = '#3313b5'
      }

      return {
        'text-align': 'center',
        'color': textColor,
        'background-image': `linear-gradient(0.25turn, #fff, 15%, ${bgColor} 25%, #fff)`
      }
    }
  },
  created () {
    this.getPlayers()
  }
}
</script>
