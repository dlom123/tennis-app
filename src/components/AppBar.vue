<template>
  <div>
    <v-app-bar app short>

      <v-toolbar-title>
        <h3>Tennis Stats</h3>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <!-- <v-btn text :to="{ name: 'tournament', params: { tournamentId: 1 }}">Lazy Cup 2020</v-btn> -->
        <v-btn text :to="{ name: 'tournament', params: { tournamentId: 2 }}">Lazy Cup 2021</v-btn>
        <v-btn text :to="{ name: 'players' }">Players</v-btn>
        <!-- <v-btn text :to="{ name: 'teams' }">Teams</v-btn> -->
        <v-btn text :to="{ name: 'leaderboard', params: { clearFilters: true } }">Leaderboard</v-btn>
        <v-btn text :to="{ name: 'racquetPile' }">Racquet Pile</v-btn>
        <v-btn text :to="{ name: 'addMatch' }"><v-icon>mdi-plus</v-icon> Match</v-btn>
      </v-toolbar-items>
      <v-btn @click.stop="toggleDrawer" class="hidden-sm-and-up text-capitalize">
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
        <v-list-item v-for="item in items" :key="item.name" exact :to="item.route" @click="goNav(item.route)">
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
export default {
  name: 'appBar',
  data() {
    return {
      drawer: false,
      items: [
        { name: 'Players', icon: 'mdi-account-group', route: { name: 'players' } },
        { name: 'Leaderboard', icon: 'mdi-clipboard-list', route: { name: 'leaderboard' } },
        { name: 'Racquet Pile', icon: 'mdi-tennis', route: { name: 'racquetPile' } },
        { name: 'Tournaments', icon: 'mdi-tournament', route: { name: 'tournaments' } },
        // { name: 'Lazy Cup 2020',
        //   icon: 'mdi-shoe-print',
        //   route: {
        //     name: 'tournament',
        //     params: {
        //       tournamentId: 1
        //     }
        //   }
        // },
        { name: 'Lazy Cup 2021',
          icon: 'mdi-shoe-print',
          route: {
            name: 'tournament',
            params: {
              tournamentId: 2
            }
          }
        },
        { name: 'Match', icon: 'mdi-plus', route: { name: 'addMatch' } }
      ]
    }
  },
  methods: {
    goNav(route) {
      // close the nav drawer if clicking the already active item
      if (this.$route.name === route.name) {
        this.drawer = false
      }
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
