<template>
  <v-col cols="6" md="4" class="leaderboard-card">
    <v-card outlined>

      <v-toolbar dark>
        <v-toolbar-title v-html="stat.stat" class="stat-name"></v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text class="container-leaders">
        <v-list two-line class="list-leaders">
          <v-list-item
            v-for="(player, i) in stat.players"
            :key="`${player.player.firstName}${player.player.lastName}`"
            :class="['row-leader', { 'row-leader-divider': i + 1 < stat.players.length }]"
          >

            <v-list-item-avatar :size="i === 0 ? 100 : 60">
              <v-img
                :src="require(`../assets/images/headshots/placeholders/${player.player.gender === 'm' ? 'men' : 'women'}/${player.player.gender === 'm' ? 'federer' : 'halep'}.png`)"
                width="280"
                max-height="230"
                :class="getBorderClass(player.player.gender)"
                class="avatar"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-html="`${player.player.firstName} ${player.player.lastName}`"
                :class="['leader-name', getTextHeaderClass(player.player.gender), { 'leader-top': i === 0 }]"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="player.total ? `${player.total}` : displayPercentage(player)"
                :class="['leader-total', { 'leader-top': i === 0 }]"
              ></v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="container-view-all">
        <v-btn
          text
          color="blue"
          class="btn-view-all"
          :to="`/stats/${stat.id}`"
        >View All</v-btn>
      </v-card-actions>

    </v-card>
  </v-col>
</template>

<script>
import { getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'leaderboardCard',
  props: ['stat'],
  methods: {
    displayPercentage(player) {
      return `${((player.in / player.of) * 100).toFixed(2)}%`
    },
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  }
}
</script>
