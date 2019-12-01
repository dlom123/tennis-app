<template>
  <v-app>

    <v-app-bar app short>
      <v-toolbar-title>TennisStats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text to="/players" :ripple="false">players</v-btn>
          </template>
          <v-list subheader>
            <v-list-item to="/players" exact>singles</v-list-item>
            <v-list-item to="/players?doubles" exact>doubles</v-list-item>
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

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      blah: false
    }
  }
}
</script>
