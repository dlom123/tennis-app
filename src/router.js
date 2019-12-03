import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from './views/Leaderboard.vue'
import Matches from './views/Matches.vue'
import Player from './views/Player.vue'
import PlayersDoubles from './views/PlayersDoubles.vue'
import PlayersSingles from './views/PlayersSingles.vue'
import Team from './views/Team.vue'
import Teams from './views/Teams.vue'

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
