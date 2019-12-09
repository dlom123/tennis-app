<template>
  <v-col cols="6" md="4" class="leaderboard-card">
    <v-card
      class="pa-2"
      outlined
    >

      <v-card-title>
        {{ leaders.stat }}
      </v-card-title>

    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'leaderboardCard',
  props: ['leaders']
}
</script>
