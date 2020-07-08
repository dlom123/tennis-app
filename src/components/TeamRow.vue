<template>
  <v-row no-gutters class="team-row" @click="goToTeam">
    <v-col :key="`${team.id}`" sm="12" class="col-team pt-4">
      <v-row no-gutters>

        <v-col
          v-for="player in team.players"
          :key="player.id"
          sm="2"
          class="col-avatars"
          align="center"
        >
          <v-img
            :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
            width="230"
          ></v-img>
        </v-col>

        <v-col sm="6" class="col-info pl-8">

          <v-row no-gutters>

            <v-col sm="12">
              <h1>
                <span
                  v-for="(player, i) in team.players"
                  :key="player.id"
                  :class="getTextHeaderClass(player.gender)"
                >
                  <span v-if="i > 0" class="doubles-separator"><h2 class="no-break">/</h2></span>
                  <h2 class="no-break">{{ player.firstName }} {{ player.lastName }}</h2>
                </span>
              </h1>
            </v-col>

            <v-col sm="4">
              <v-row no-gutters class="mt-3">
                <v-col sm="12">
                  <h3>Rating</h3>
                </v-col>
                <v-col sm="12">
                  <p>{{ combinedRating }}</p>
                </v-col>
              </v-row>
            </v-col>

            <v-col sm="4">
              <v-row no-gutters class="row-player-info">
                <v-col sm="12">
                  <h3>Matches Played</h3>
                </v-col>
                <v-col sm="12">
                  <p>35</p>
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
  name: 'teamRow',
  props: ['team'],
  computed: {
    combinedRating() {
      let rating = 0.0
      this.team.players.forEach(player => {
        rating += Number(player.rating)
      })

      return rating.toFixed(1)
    }
  },
  methods: {
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    },
    goToTeam() {
      this.$router.push({ name: 'team', params: { teamId: this.team.id } })
    }
  }
}
</script>

<style scoped lang="sass">
.team-row
  border-bottom: 2px solid #e0e0e0
  background-color: white
  .col-team
    .col-avatars
      position: relative
    .col-info
      .text-men
        color: #00b1ef
      .text-women
        color: #3313b5
      .doubles-separator
        color: #aaaaaa
      .no-break
        display: inline
  &:hover
    cursor: pointer
</style>
