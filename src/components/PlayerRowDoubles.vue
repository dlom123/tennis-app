<template>
  <v-row class="player-row">
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
            width="280"
            max-height="230"
            contain
            class="avatar"
          >
          </v-img>
        </v-col>

        <!-- <v-col sm="9">

          <v-row no-gutters>

            <v-col sm="12" style="margin-top: 20px;">
              <h1 :class="getTextHeaderClass(player.gender)">{{player.firstName}} {{player.lastName}}</h1>
            </v-col>

            <v-col sm="6">

              <v-row no-gutters style="margin-top: 20px;">

                <v-col sm="12">
                  <h3 :class="getTextHeaderClass(player.gender)">Ranking Points</h3>
                </v-col>
                <v-col sm="12">
                  540
                </v-col>

              </v-row>

              <v-row no-gutters style="margin-top: 20px;">

                <v-col sm="12">
                  <h3 :class="getTextHeaderClass(player.gender)">Matches Played</h3>
                </v-col>
                <v-col sm="12">
                  35
                </v-col>

              </v-row>

            </v-col>

            <v-col sm="6">

              <v-row no-gutters style="margin-top: 20px;">

                <v-col sm="12">
                  <h3 :class="getTextHeaderClass(player.gender)">Rating</h3>
                </v-col>
                <v-col sm="12">
                  4.0
                </v-col>

              </v-row>

            </v-col>

          </v-row>

        </v-col> -->

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
    }
  }
}
</script>
