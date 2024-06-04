import Vue from 'vue'
import Router from 'vue-router'
import AddMatch from '@/views/AddMatch'
import ReserveCourt from '@/views/ReserveCourt'
import Dashboard from '@/views/Dashboard'
import Home from '@/views/Home'
import Leaderboard from '@/views/Leaderboard'
import Locations from '@/views/Locations'
import Login from '@/views/Login'
import Player from '@/views/Player'
import Players from '@/views/Players'
import RacquetPile from '@/views/RacquetPile'
import Stat from '@/views/Stat'
import Store from '@/store'
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
      component: Home
    },
    {
      path: '/add-match',
      name: 'addMatch',
      component: AddMatch,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/players/:playerId',
      name: 'player',
      component: Player,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/players',
      name: 'players',
      component: Players,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/racquet-pile',
      name: 'racquetPile',
      component: RacquetPile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reserve-court',
      name: 'reserveCourt',
      component: ReserveCourt,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stats/:statId',
      name: 'stat',
      component: Stat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: Tournaments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tournaments/:tournamentId',
      name: 'tournament',
      component: Tournament,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user-settings',
      name: 'userSettings',
      component: UserSettings,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const isLoggedIn = localStorage.getItem('access_token')
  if (requiresAuth) {
    if (isLoggedIn) {
      next()
    } else {
      Store.dispatch('logout')
    }
  } else {
    if (isLoggedIn) {
      next({ name: 'dashboard' })
    }
  }
  next()
})

export default router
