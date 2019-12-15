<template>
  <v-app>

    <v-app-bar app short>

      <v-toolbar-title @click="$router.push({ name: 'home' })" class="title-link">TennisStats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/players">Players</v-btn>
        <v-btn text to="/teams">Teams</v-btn>
        <v-btn text to="/leaderboard">Leaderboard</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content class="container-views">
      <router-view/>
    </v-content>

  </v-app>
</template>
