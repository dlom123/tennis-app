<template>
  <div>

    <v-toolbar>
      <v-toolbar-title>TennisStats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/">players</v-btn>
        <v-btn text to="/matches">matches</v-btn>
        <v-btn text to="/leaderboard">leaderboard</v-btn>
      </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

  </div>
</template>
