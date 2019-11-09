<template>
  <v-app>

    <v-app-bar app short>
      <v-toolbar-title>TennisStats</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/">players</v-btn>
        <v-btn text to="/matches">matches</v-btn>
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
