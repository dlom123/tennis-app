<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">

          <v-col>
            <h1>{{ stat.name }}</h1>
            <Breadcrumbs :items="breadcrumbItems" />
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <ToggleSinglesDoubles/>
          </v-col>

        </v-row>

        <FilterBarStat/>

        <v-row no-gutters class="stat-leaders">
          <v-col cols="12" class="container-leaders">

            <v-list two-line class="list-leaders">
              <v-list-item
                v-for="(player, i) in leadersFiltered"
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
                    class="avatar"
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

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'
import FilterBarStat from '@/components/filters/FilterBarStat'
import Spinner from '@/components/Spinner'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { filterStatLeaders, getGenderBorderClass, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'stat',
  components: {
    Breadcrumbs,
    FilterBarStat,
    Spinner,
    ToggleSinglesDoubles
  },
  data() {
    return {
      headers: [],
      items: []
    }
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'stat'
    ]),
    breadcrumbItems() {
      return [
        { text: 'Leaderboard', to: { name: 'leaderboard' }, exact: true },
        { text: this.stat.name, disabled: true }
      ]
    },
    leadersFiltered() {
      // apply filters
      const leadersFiltered = filterStatLeaders(this.stat.players, this.filters)

      return leadersFiltered
    }
  },
  methods: {
    ...mapActions([
      'getStat'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setStat'
    ]),
    displayPercentage(player) {
      if (player.in === 0 || player.of === 0) {
        return '0.00%'
      }

      return `${((player.in / player.of) * 100).toFixed(2)}%`
    },
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['stat', 'leaderboard'])

    this.setLoading(true)
    await this.getStat(this.$route.params.statId)
    this.setLoading(false)
  },
  destroyed() {
    this.setStat({})
  }
}
</script>
