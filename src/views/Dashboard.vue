<template>
  <v-container fluid class="pa-0">
    <v-row
      no-gutters
      :class="{
        'px-2 py-2': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-col>
        <h1>Dashboard</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <ToggleSinglesDoubles class="align-self-end" />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4">
        <v-row no-gutters>
          <v-col
            cols="12"
            :class="getBorderClass(player.gender)"
            class="container-avatar mb-1 pt-2"
            align="center"
          >
            <v-img
              :src="getPlayerAvatar(player)"
              max-height="210"
              max-width="250"
              contain
            ></v-img>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" class="mb-2">
            <h2 :class="getTextHeaderClass(player.gender)">{{ fullName }}</h2>
          </v-col>
        </v-row>
      </v-col>

      <v-col md="8">
        <PlayerData />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PlayerData from '@/components/PlayerData'
import ToggleSinglesDoubles from '@/components/ToggleSinglesDoubles'
import { getGenderBorderClass, getGenderTextClass, getPlayerAvatar } from '@/utils/functions'

export default {
  name: 'dashboard',
  components: {
    PlayerData,
    ToggleSinglesDoubles
  },
  computed: {
    ...mapState([
      'isLoading',
      'player'
    ]),
    fullName() {
      return `${this.player.firstName} ${this.player.lastName}`
    }
  },
  methods: {
    getBorderClass(gender) {
      return getGenderBorderClass(gender)
    },
    getPlayerAvatar,
    getTextHeaderClass(gender) {
      return getGenderTextClass(gender)
    }
  }
}
</script>
