<template>
  <v-container fluid class="pa-0">

    <v-row no-gutters>
      <v-col
        cols="12"
        :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
        class="px-0"
      >
        <v-expansion-panels
          accordion
          multiple
          :value="[0,1]"
        >
          <PlayerStats :stats="player.stats" :view="view" />
          <PlayerMatches :matches="player.matches" :view="view" />
        </v-expansion-panels>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PlayerMatches from '@/components/PlayerMatches'
import PlayerStats from '@/components/PlayerStats'

export default {
  name: 'playerData',
  components: {
    PlayerMatches,
    PlayerStats
  },
  props: ['player'],
  computed: {
    ...mapState([
      'view'
    ])
  }
}
</script>
