<template>
  <v-row no-gutters class="pa-1 mt-2 mb-2">
    <v-col>

      <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 1"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreaker="onChangeTiebreaker"
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

        <AddSetsBoxes :numSets="numSets" :onChangeSet="onChangeSet" />

      </v-row>

      <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 2"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreaker="onChangeTiebreaker"
        class="mt-2" />

    </v-col>
  </v-row>

</template>

<script>
import { mapState } from 'vuex'
import AddSetsTiebreakerRow from '@/components/AddSetsTiebreakerRow'
import AddSetsBoxes from '@/components/AddSetsBoxes'

export default {
  name: 'addSetsRow',
  components: {
    AddSetsBoxes,
    AddSetsTiebreakerRow
  },
  props: [
    'numPlayersPerSide',
    'updatePlayer',
    'updateSet',
    'updateTiebreaker',
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
      // TODO: filter out players that have already been chosen for this match
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
      this.updatePlayer(this.side, n, player)
    },
    onChangeSet(n, score) {
      this.updateSet(this.side, n, score)
    },
    onChangeTiebreaker(n, score) {
      this.updateTiebreaker(this.side, n, score)
    }
  }
}
</script>
