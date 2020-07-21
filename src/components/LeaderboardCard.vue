<template>
  <v-card outlined>

    <v-toolbar dark color="primary">
      <v-toolbar-title v-html="`<h2>${stat.name}</h2>`" class="stat-name"></v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">

        <div v-if="statPlayers.length > 0">
          <v-list-item
            v-for="(player, i) in statPlayers"
            :key="`${player.player.firstName}${player.player.lastName}`"
            :class="{ 'row-leader-divider': i + 1 < statPlayers.length }"
          >

            <v-list-item-icon>
              <h3 :class="{ 'rank-top mt-1': i === 0 }">#{{ player.rank }}</h3>
            </v-list-item-icon>

            <v-list-item-avatar :size="i === 0 ? 90 : 60">
              <v-img
                :src="require(`../assets/images/headshots/${player.player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
                width="280"
                max-height="230"
                :class="getBorderClass(player.player.gender)"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="ml-4">

              <v-list-item-title :class="[getTextHeaderClass(player.player.gender)]">
                <h2 v-if="i === 0">{{ player.player.firstName }} {{ player.player.lastName }}</h2>
                <h3 v-else>{{ player.player.firstName }} {{ player.player.lastName }}</h3>
              </v-list-item-title>

              <v-list-item-subtitle :class="['leader-total', {'leader-top': i === 0}]">
                <span v-if="player.hasOwnProperty('total')">
                  <span>{{ player.total }}</span>
                </span>
                <span v-else @click="toggleShowPercent">
                  <span>{{ getStatPercentage(player) }}</span>
                </span>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>
        </div>
        <div v-else>
          <v-list-item>
            <v-list-item-content class="ml-4">
              <p class="text-info ma-0" align="center">No players to show.</p>
            </v-list-item-content>
          </v-list-item>
        </div>

      </v-list>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions
      v-if="$route.name === 'leaderboard' && statPlayers.length > 0"
      class="container-view-all pa-0"
    >
      <v-btn
        text
        color="blue"
        class="btn-view-all"
        @click="goStat(stat.id)"
      ><h4>View All</h4></v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getGenderBorderClass, getGenderTextClass, getPrecisionPercentage } from '@/utils/functions'

export default {
  name: 'leaderboardCard',
  props: ['stat'],
  data() {
    return {
      showPercent: true
    }
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'view'
    ]),
    statPlayers() {
      if (this.view === 'singles') {
        return this.stat.singles.players
      } else {
        return this.stat.doubles.players
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateFilter'
    ]),
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    },
    getStatPercentage(player) {
      return this.showPercent
        ? `${getPrecisionPercentage(player.hits, player.of).toFixed(2)}%`
        : `${player.hits}/${player.of}`
    },
    goStat(statId) {
      // any Leaderboard filters set should be maintained within the Stat screen
      this.filters.forEach(f => {
        if (f.screen === this.$route.name) {
          this.updateFilter({ screen: 'stat', name: f.name, value: f.value })
        }
      })

      this.$router.push({ name: 'stat', params: { statId } })
    },
    toggleShowPercent() {
      this.showPercent = !this.showPercent
    }
  }
}
</script>

<style scoped lang="sass">
.row-leader-divider
  border-bottom: 1px solid #e0e0e0
.rank-top
  font-size: 22pt
.leader-total
  font-size: 14pt
.leader-top
  font-size: 20pt
  font-weight: bold
  color: green
.text-men
  color: #00b1ef
  white-space: normal
.text-women
  color: #3313b5
  white-space: normal

.container-view-all
  .btn-view-all
    width: 100%
    height: 50px
</style>
