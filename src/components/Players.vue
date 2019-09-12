<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>
      <template v-for="player in players">
        <v-col :key="`${player.firstName}${player.lastName}`" sm="4" md="3">
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
        <!-- <v-responsive
          v-if="i === 2"
          :key="`width-${i}`"
          width="100%"
        ></v-responsive> -->
      </template>
    </v-row>

    <v-dialog
      :value="showPlayerDialog"
      fullscreen
      scrollable
      light
      @click:outside="setShowPlayerDialog(false)"
      @keydown.esc="setShowPlayerDialog(false)"
    >
      <PlayerStats :player="currentPlayer" />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import PlayerStats from '@/components/PlayerStats.vue'

export default {
  name: 'players',
  components: { PlayerStats },
  data () {
    return {
      players: [
        { firstName: 'Doug', lastName: 'Brown', gender: 'm', ranking: '', img: '' },
        { firstName: 'Andrea', lastName: 'Burkhardt', gender: 'w', ranking: '', img: '' },
        { firstName: 'Kourtney', lastName: 'Cogdill', gender: 'w', ranking: '', img: '' },
        { firstName: 'Alex', lastName: 'Fohl', gender: 'm', ranking: '', img: '' },
        { firstName: 'Chris', lastName: 'Layton', gender: 'm', ranking: '', img: '' },
        { firstName: 'Maddie', lastName: 'Lee', gender: 'w', ranking: '', img: '' },
        { firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', ranking: '', img: '' },
        { firstName: 'Dax', lastName: 'Lowery', gender: 'm', ranking: '', img: '' },
        { firstName: 'Lisa', lastName: 'Martin', gender: 'w', ranking: '', img: '' },
        { firstName: 'Kessa', lastName: 'McNaught', gender: 'w', ranking: '', img: '' },
        { firstName: 'Stephanie', lastName: 'Smith', gender: 'w', ranking: '', img: '' },
        { firstName: 'Dan', lastName: 'Somers', gender: 'm', ranking: '', img: '' },
        { firstName: 'Heidi', lastName: 'Somers', gender: 'w', ranking: '', img: '' },
        { firstName: 'David', lastName: 'Strom', gender: 'm', ranking: '', img: '' },
        { firstName: 'Sara', lastName: 'Tokoly', gender: 'w', ranking: '', img: '' },
        { firstName: 'Ed', lastName: 'Ventura', gender: 'm', ranking: '', img: '' },
        { firstName: 'Elise', lastName: 'Vestal', gender: 'w', ranking: '', img: '' },
        { firstName: 'Emily', lastName: 'Wandel', gender: 'w', ranking: '', img: '' },
        { firstName: 'Brandon', lastName: 'Wiley', gender: 'm', ranking: '', img: '' },
        { firstName: 'Tony', lastName: 'Winkler', gender: 'm', ranking: '', img: '' },
        { firstName: 'Erin', lastName: 'Wolski', gender: 'w', ranking: '', img: '' }
      ],
      zIndex: 10
    }
  },
  computed: {
    ...mapGetters([
      'isViewingPlayer'
    ]),
    ...mapState([
      'currentPlayer',
      'showPlayerDialog'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentPlayer',
      'setShowPlayerDialog'
    ]),
    showPlayer (player) {
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
