import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from './views/Leaderboard'
import Matches from './views/Matches'
import Player from './views/Player'
import PlayersDoubles from './views/PlayersDoubles'
import PlayersSingles from './views/PlayersSingles'
import Team from './views/Team'
import Teams from './views/Teams'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlayersSingles
    },
    {
      path: '/doubles',
      name: 'doubles',
      component: PlayersDoubles
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
      path: '/singles',
      name: 'singles',
      component: PlayersSingles
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
