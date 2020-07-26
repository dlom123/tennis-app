import Vue from 'vue'
import Router from 'vue-router'
import AddMatch from '@/views/AddMatch'
import Leaderboard from '@/views/Leaderboard'
import Player from '@/views/Player'
import Players from '@/views/Players'
import Stat from '@/views/Stat'
import Team from '@/views/Team'
import Teams from '@/views/Teams'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Players,
      redirect: 'players'
    },
    {
      path: '/add-match',
      name: 'addMatch',
      component: AddMatch
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/players/:playerId',
      name: 'player',
      component: Player
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
    {
      path: '/stats/:statId',
      name: 'stat',
      component: Stat
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
