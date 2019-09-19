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
      await this.getStats(player.id)
      this.setCurrentPlayer(player)
      this.setShowPlayerDialog(true)
    },
    stylePlayerImage (player) {
      return {
        'background-image': `url(${require('@/assets/images/headshots/' + player.img)})`
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

    this.players.forEach(player => {
      let image = player.img

      if (!player.img) {
        // if the player does not have a headshot of their own, grab a random placeholder headshot for the player's gender
        const men = ['anderson', 'berdych', 'dimitrov', 'djokovic', 'federer', 'isner', 'kyrgios', 'mcenroe', 'nadal', 'nishikori', 'raonic', 'simon', 'wawrinka', 'zverev']
        const women = ['azarenka', 'barty', 'bouchard', 'clijsters', 'halep', 'hingis', 'kerber', 'keys', 'muguruza', 'osaka', 'sharapova', 'stephens', 'venus', 'wozniacki']
        let randomPlayer

        if (player.gender === 'm') {
          randomPlayer = men[Math.floor(Math.random() * men.length)]
          image = `placeholders/men/${randomPlayer}.png`
        } else {
          randomPlayer = women[Math.floor(Math.random() * women.length)]
          image = `placeholders/women/${randomPlayer}.png`
        }
      }

      player.img = image
    })
  }
}
</script>
