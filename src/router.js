import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Leaderboard from './views/Leaderboard.vue'
import Matches from './views/Matches.vue'
import Player from './views/Player.vue'
import Team from './views/Team.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/player/:playerId',
      name: 'player',
      component: Player
    },
    {
      path: '/team/:teamId',
      name: 'team',
      component: Team
    }
  ]
})

export default router
