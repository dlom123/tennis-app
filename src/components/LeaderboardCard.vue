<template>
  <v-col cols="6" md="4" class="leaderboard-card">
    <v-card outlined>

      <v-toolbar dark>
        <v-toolbar-title v-html="stat.name" class="stat-name"></v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text class="container-leaders">
        <v-list two-line class="list-leaders">
          <v-list-item
            v-for="(player, i) in stat.players"
            :key="`${player.player.firstName}${player.player.lastName}`"
            :class="['row-leader', { 'row-leader-divider': i + 1 < stat.players.length }]"
          >

            <v-list-item-icon class="container-rank">
              <span :class="['rank', { 'rank-top': i === 0 }]">#{{ i + 1 }}</span>
            </v-list-item-icon>

            <v-list-item-avatar :size="i === 0 ? 100 : 60" class="container-avatar">
              <v-img
                :src="require(`../assets/images/headshots/placeholders/${player.player.gender === 'm' ? 'men' : 'women'}/${player.player.gender === 'm' ? 'federer' : 'halep'}.png`)"
                width="280"
                max-height="230"
                :class="getBorderClass(player.player.gender)"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="container-info">
              <v-list-item-title
                v-html="`${player.player.firstName} ${player.player.lastName}`"
                :class="['leader-name', getTextHeaderClass(player.player.gender), { 'leader-top': i === 0 }]"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="player.hasOwnProperty('total') ? `${player.total}` : displayPercentage(player)"
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
          :to="{ name: 'stat', params: { statId: stat.id }}"
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

<style scoped lang="sass">
.leaderboard-card
  padding-top: 0
  margin-bottom: 15px
  .stat-name
    font-size: 22pt

.container-leaders
  padding: 0
  .list-leaders
    padding: 0
    .row-leader
      padding: 0px 25px
    .row-leader-divider
      border-bottom: 1px solid #e0e0e0

.container-rank
  margin-left: -10px
  .rank
    padding: 0
    font-size: 14pt
  .rank-top
    margin-top: 5px
    font-size: 22pt

.container-avatar
  margin-left: -20px
  .border-men
    border: 2px solid #00b1ef
  .border-women
    border: 2px solid #3313b5

.container-info
  margin-left: 15px
  .text-men
    color: #00b1ef
  .text-women
    color: #3313b5
  .leader-name
    font-size: 14pt
  .leader-total
    font-size: 14pt
  .leader-top
    font-size: 18pt

.container-view-all
  padding: 0
  .btn-view-all
    width: 100%
    height: 50px
</style>
