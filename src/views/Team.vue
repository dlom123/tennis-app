<template>
  <v-container fluid class="grey lighten-5 container-main">
    <v-row no-gutters v-for="player in team.players" :key="player.id">
      <v-col>{{ player.firstName }} {{ player.lastName }}</v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'team',
  computed: {
    ...mapState([
      'team'
    ])
  },
  methods: {
    ...mapActions([
      'getTeam'
    ])
  },
  created () {
    this.getTeam(this.$route.params.teamId)
  }
}
</script>
