<template>
  <v-app>

    <v-app-bar app short>

      <v-toolbar-title>Tennis Stats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/players">Players</v-btn>
        <v-btn text to="/teams">Teams</v-btn>
        <v-btn text to="/leaderboard">Leaderboard</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<style scoped lang="sass">
.v-application
  font-family: 'Oswald', sans-serif
</style>
