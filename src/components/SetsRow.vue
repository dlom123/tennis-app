<template>
  <v-row no-gutters class="mb-1">
    <v-col>

      <v-row no-gutters class="mb-2" align="center">

        <v-col cols="5" class="ml-2">
          <v-row no-gutters v-for="player in side.players" :key="player.id">
            <v-col>
              <a :href="`/players/${player.id}`">{{ displayPlayerName(player.firstName, player.lastName) }}</a>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row no-gutters>
            <v-col cols="2">
              <v-icon v-if="side.isWinner" color="green">mdi-check-outline</v-icon>
            </v-col>
            <v-col cols="2" v-for="(score, i) in side.games" :key="i" align="center">
              <h3>{{ score }}<span class="tiebreaker-superscript">{{ side.tiebreakerPoints[i] }}</span></h3>
            </v-col>
          </v-row>
        </v-col>

      </v-row>

      <v-divider v-if="showDivider($vnode.key)"></v-divider>

    </v-col>
  </v-row>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'setsRow',
  props: ['side'],
  computed: {
    ...mapState([
      'view'
    ])
  },
  methods: {
    displayPlayerName(firstName, lastName) {
      return `${firstName[0].toUpperCase()}. ${lastName}`
    },
    showDivider(key) {
      return this.view === 'singles' ? key === 0 : key < (this.side.players.length - 1)
    }
  }
}
</script>
