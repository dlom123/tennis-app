import Vue from 'vue'
import Router from 'vue-router'
import AddMatch from '@/views/AddMatch'
import Leaderboard from '@/views/Leaderboard'
import Player from '@/views/Player'
import Players from '@/views/Players'
import RacquetPile from '@/views/RacquetPile'
import Stat from '@/views/Stat'
import Tournaments from '@/views/Tournaments'

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
      path: '/racquet-pile',
      name: 'racquetPile',
      component: RacquetPile
    },
    {
      path: '/stats/:statId',
      name: 'stat',
      component: Stat
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: Tournaments
    }
  ]
})

export default router
