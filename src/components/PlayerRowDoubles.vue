<template>
  <v-row class="player-row-doubles" @click="goToTeam">
    <v-col :key="`${team.id}`" sm="12" class="col-players">
      <v-row no-gutters>

        <h1 class="ranking">{{ team.id }}</h1>

        <v-col
          v-for="player in team.players"
          :key="player.id"
          sm="2"
          class="col-avatars"
          align="center"
        >
          <v-img
            :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
            width="230"
            class="avatar"
          >
          </v-img>
        </v-col>

        <v-col sm="6" class="col-info">

          <v-row no-gutters>

            <v-col
              sm="12"
              class="player-names"
            >
              <h1>
                <span
                  v-for="(player, i) in team.players"
                  :key="player.id"
                  :class="getTextHeaderClass(player.gender)"
                >
                  <span v-if="i > 0" class="doubles-separator">/</span>
                  {{player.firstName}} {{player.lastName}}
                </span>
              </h1>
            </v-col>

            <v-col sm="4">

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Ranking Points</h3>
                </v-col>
                <v-col sm="12">
                  540
                </v-col>
              </v-row>

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Matches Played</h3>
                </v-col>
                <v-col sm="12">
                  35
                </v-col>
              </v-row>

            </v-col>

            <v-col sm="4">

              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Rating</h3>
                </v-col>
                <v-col sm="12">
                  8.0
                </v-col>
              </v-row>

            </v-col>

          </v-row>

        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { getGenderTextClass } from '@/utils/functions'

export default {
  name: 'playerRowDoubles',
  props: ['team'],
  methods: {
    getTextHeaderClass (gender) {
      return getGenderTextClass(gender)
    },
    goToTeam () {
      this.$router.push({ name: 'team', params: { teamId: this.team.id } })
    }
  }
}
</script>
