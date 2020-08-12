<template>
  <div>
    <v-app-bar app short>

      <v-toolbar-title>
        <h3>Tennis Stats</h3>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
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
        <v-list-item v-for="item in items" :key="item.name" exact :to="{ name: item.route }" @click="goNav(item.route)">
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
        { name: 'Players', icon: 'mdi-account-group', route: 'players' },
        { name: 'Leaderboard', icon: 'mdi-clipboard-list', route: 'leaderboard' },
        { name: 'Match', icon: 'mdi-plus', route: 'addMatch' }
      ]
    }
  },
  methods: {
    goNav(route) {
      // close the nav drawer if clicking the already active item
      if (this.$route.name === route) {
        this.drawer = false
      }
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
