import Vue from 'vue'
import Router from 'vue-router'
import AddMatch from '@/views/AddMatch'
import ReserveCourt from '@/views/ReserveCourt'
import Dashboard from '@/views/Dashboard'
import Leaderboard from '@/views/Leaderboard'
import Locations from '@/views/Locations'
import Player from '@/views/Player'
import Players from '@/views/Players'
import RacquetPile from '@/views/RacquetPile'
import Stat from '@/views/Stat'
import Tournament from '@/views/Tournament'
import Tournaments from '@/views/Tournaments'
import UserSettings from '@/views/UserSettings'

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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations
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
      path: '/reserve-court',
      name: 'reserveCourt',
      component: ReserveCourt
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
    },
    {
      path: '/tournaments/:tournamentId',
      name: 'tournament',
      component: Tournament
    },
    {
      path: '/user-settings',
      name: 'userSettings',
      component: UserSettings
    }
  ]
})

export default router
