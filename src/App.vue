<template>
  <v-app>

    <v-app-bar app short>
      <v-toolbar-title @click="$router.push('/')" class="title-link">TennisStats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text :ripple="false">players</v-btn>
          </template>
          <v-list subheader>
            <v-list-item to="/singles" exact>singles</v-list-item>
            <v-list-item to="/doubles" exact>doubles</v-list-item>
          </v-list>
        </v-menu>

        <v-btn text to="/teams">teams</v-btn>
        <v-btn text to="/leaderboard">leaderboard</v-btn>

      </v-toolbar-items>

      <!-- <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template> -->

    </v-app-bar>

    <v-content class="container-views">
      <router-view/>
    </v-content>

  </v-app>
</template>
