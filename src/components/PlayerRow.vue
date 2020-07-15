<template>
  <v-row :key="player.id" no-gutters class="player-row pt-2" @click="goToPlayer">

    <v-col cols="5" class="col-avatar pt-4">
      <v-img
        :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/${playerAvatar}`)"
        max-height="160"
        contain
      ></v-img>
    </v-col>

    <v-col cols="7" class="col-info px-2 pt-4">
      <v-row no-gutters>

        <v-col cols="12">
          <h2 :class="getTextHeaderClass(player.gender)">{{ player.firstName }} {{ player.lastName }}</h2>
        </v-col>

        <v-col cols="6">
          <v-row no-gutters class="row-player-info">

            <v-col cols="12">
              <h3>Rating</h3>
            </v-col>

            <v-col cols="12">
              <p>{{ player.rating }}</p>
            </v-col>

          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row no-gutters class="row-player-info">

            <v-col cols="12">
              <h3>Gender</h3>
            </v-col>

            <v-col cols="12">
              <p>{{ playerGender }}</p>
            </v-col>

          </v-row>
        </v-col>

      </v-row>
    </v-col>

  </v-row>
</template>

<script>
import { getDisplayGender, getGenderTextClass } from '@/utils/functions'

export default {
  name: 'playerRow',
  props: [
    'player',
    'type'
  ],
  computed: {
    playerAvatar() {
      return this.player.avatarUrl || 'silhouette.png'
    },
    playerGender() {
      return getDisplayGender(this.player.gender)
    }
  },
  methods: {
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    },
    goToPlayer() {
      this.$router.push({ name: 'player', params: { playerId: this.player.id, type: this.type } })
    }
  }
}
</script>

<style scoped lang="sass">
.player-row
  border-bottom: 1px solid #e0e0e0
  background-color: white
  &:hover
    cursor: pointer

.text-men
  color: #00b1ef

.text-women
  color: #3313b5
</style>
