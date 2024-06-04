<template>
  <div>
    <v-app-bar app short>
      <v-toolbar-title>
        <h3>TennisApp</h3>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!isAuthenticated" class="hidden-xs-only">
        <v-btn text :to="{ name: 'login' }">Log In</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-xs-only">
        <v-btn text :to="{ name: 'dashboard' }">Dashboard</v-btn>
        <v-btn text :to="{ name: 'locations' }">Locations</v-btn>
        <v-btn text :to="{ name: 'players' }">Players</v-btn>

        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Tools</v-btn>
          </template>

          <v-list dense class="pa-0">
            <v-list-item class="pa-0">
              <v-btn text plain :to="{ name: 'racquetPile' }"
                >Racquet Pile</v-btn
              >
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn text plain :to="{ name: 'reserveCourt' }"
                >Reserve a Court</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon x-large>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list dense class="pa-0">
            <v-list-item class="pa-0">
              <v-btn text :to="{ name: 'userSettings' }">Settings</v-btn>
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn text @click="onLogout">Log Out</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-btn
        @click.stop="toggleDrawer"
        class="hidden-sm-and-up text-capitalize"
      >
        Menu
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      right
      disable-resize-watcher
    >
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.name"
          exact
          :to="item.route"
          @click="goNav(item.route)"
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'appBar',
  data() {
    return {
      drawer: false,
      items: [
        { name: 'ReserveCourt', icon: 'mdi-tennis', route: { name: 'reserveCourt' } },
        { name: 'Players', icon: 'mdi-account-group', route: { name: 'players' } },
        // { name: 'Leaderboard', icon: 'mdi-clipboard-list', route: { name: 'leaderboard' } },
        { name: 'Racquet Pile', icon: 'mdi-tennis', route: { name: 'racquetPile' } },
        // { name: 'Tournaments', icon: 'mdi-tournament', route: { name: 'tournaments' } },
        // { name: 'Lazy Cup 2020',
        //   icon: 'mdi-shoe-print',
        //   route: {
        //     name: 'tournament',
        //     params: {
        //       tournamentId: 1
        //     }
        //   }
        // },
        { name: 'Match', icon: 'mdi-plus', route: { name: 'addMatch' } }
      ]
    }
  },
  computed: {
    ...mapState([
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    goNav(route) {
      // close the nav drawer if clicking the already active item
      if (this.$route.name === route.name) {
        this.drawer = false
      }
    },
    onLogout() {
      this.logout()
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
