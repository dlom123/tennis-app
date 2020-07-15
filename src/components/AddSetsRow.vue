<template>
  <v-row no-gutters class="pa-1 mt-2 mb-2">
    <v-col>

      <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 1"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreakerSet="onChangeTiebreakerSet"
        class="mb-2" />

      <v-row no-gutters class="mb-2">

        <v-col cols="4" class="ml-2">
          <v-row no-gutters v-for="n in numPlayersPerSide" :key="n">
            <v-autocomplete
              background-color="white"
              hide-details
              hide-selected
              dense
              placeholder="Select player"
              :items="itemsPlayers"
              @change="(player) => onChangePlayer(n, player)"
            ></v-autocomplete>
          </v-row>
        </v-col>

        <SetBoxes :numSets="numSets" :onChangeSet="onChangeSet" />

      </v-row>

      <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 2"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreakerSet="onChangeTiebreakerSet"
        class="mt-2" />

    </v-col>
  </v-row>

</template>

<script>
import { mapState } from 'vuex'
import AddSetsTiebreakerRow from '@/components/AddSetsTiebreakerRow'
import SetBoxes from '@/components/SetBoxes'

export default {
  name: 'addSetsRow',
  components: {
    AddSetsTiebreakerRow,
    SetBoxes
  },
  props: [
    'numPlayersPerSide',
    'showTiebreakerRows',
    'side'
  ],
  data() {
    return {
      numSets: 5,
      sides: []
    }
  },
  computed: {
    ...mapState([
      'players'
    ]),
    itemsPlayers() {
      const players = this.players.map(player => {
        return {
          text: `${player.firstName} ${player.lastName}`,
          value: player
        }
      })
      return players
    }
  },
  methods: {
    onChangePlayer(n, player) {
      console.log(this.side, n, player.lastName)
    },
    onChangeSet(n, score) {
      console.log(`Side ${this.side}, set ${n}, ${score}`)
    },
    onChangeTiebreakerSet(n, score) {
      console.log(`Tiebreaker side ${this.side}, set ${n}, ${score}`)
    }
  }
}
</script>
