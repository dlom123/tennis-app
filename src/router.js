import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from './views/Leaderboard.vue'
import Matches from './views/Matches.vue'
import Player from './views/Player.vue'
import Players from './views/Players.vue'
import Team from './views/Team.vue'
import Teams from './views/Teams.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'players',
      component: Players
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/players/:playerId',
      name: 'player',
      component: Player
    },
    {
      path: '/teams/:teamId',
      name: 'team',
      component: Team
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    }
  ]
})

export default router
