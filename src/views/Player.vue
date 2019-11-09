<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters>
      <v-col>{{ player.firstName }} {{ player.lastName }}</v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'player',
  computed: {
    ...mapState([
      'player'
    ])
  },
  methods: {
    ...mapActions([
      'getPlayer'
    ])
  },
  created () {
    this.getPlayer(this.$route.params.playerId)
  }
}
</script>
