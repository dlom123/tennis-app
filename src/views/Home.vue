<template>
  <v-container fluid>

    <PlayersFilterBar/>

    <template v-if="!isFilterDoubles">
      <PlayerRowSingles
        v-for="(player, i) in playersSinglesSorted"
        :key="player.id"
        :player="player"
        :ranking="i + 1"
      />
    </template>

    <template v-else>
      <PlayerRowDoubles
        v-for="(team, i) in playersDoublesSorted"
        :key="team.id"
        :team="team"
        :ranking="i + 1"
      />
    </template>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PlayersFilterBar from '@/components/PlayersFilterBar.vue'
import PlayerRowDoubles from '@/components/PlayerRowDoubles.vue'
import PlayerRowSingles from '@/components/PlayerRowSingles.vue'
import { FILTERS } from '@/utils/constants'

export default {
  name: 'home',
  components: {
    PlayerRowDoubles,
    PlayerRowSingles,
    PlayersFilterBar
  },
  data () {
    return {
      playersSingles: [
        { id: 3, firstName: 'Alex', lastName: 'Fohl', gender: 'm', avatarUrl: '', points: 90 },
        { id: 6, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', avatarUrl: '', points: 150 },
        { id: 12, firstName: 'Emily', lastName: 'Wandel', gender: 'f', avatarUrl: '', points: 40 },
        { id: 4, firstName: 'Chris', lastName: 'Layton', gender: 'm', avatarUrl: '', points: 50 },
        { id: 13, firstName: 'Tony', lastName: 'Winkler', gender: 'm', avatarUrl: '', points: 110 },
        { id: 1, firstName: 'Doug', lastName: 'Brown', gender: 'm', avatarUrl: '', points: 60 },
        { id: 7, firstName: 'Dax', lastName: 'Lowery', gender: 'm', avatarUrl: '', points: 140 },
        { id: 2, firstName: 'Andrea', lastName: 'Burkhardt', gender: 'f', avatarUrl: '', points: 120 },
        { id: 5, firstName: 'Maddie', lastName: 'Lee', gender: 'f', avatarUrl: '', points: 130 },
        { id: 9, firstName: 'Dan', lastName: 'Somers', gender: 'm', avatarUrl: '', points: 30 },
        { id: 10, firstName: 'Heidi', lastName: 'Somers', gender: 'f', avatarUrl: '', points: 70 },
        { id: 8, firstName: 'Kessa', lastName: 'McNaught', gender: 'f', avatarUrl: '', points: 100 },
        { id: 11, firstName: 'David', lastName: 'Strom', gender: 'm', avatarUrl: '', points: 80 }
      ],
      playersDoubles: [
        {
          id: 1,
          players: [
            { id: 3, firstName: 'Alex', lastName: 'Fohl', gender: 'm', avatarUrl: '' },
            { id: 6, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', avatarUrl: '' }
          ],
          points: 150
        },
        {
          id: 2,
          players: [
            { id: 12, firstName: 'Emily', lastName: 'Wandel', gender: 'f', avatarUrl: '' },
            { id: 4, firstName: 'Chris', lastName: 'Layton', gender: 'm', avatarUrl: '' }
          ],
          points: 120
        },
        {
          id: 3,
          players: [
            { id: 13, firstName: 'Tony', lastName: 'Winkler', gender: 'm', avatarUrl: '' },
            { id: 1, firstName: 'Doug', lastName: 'Brown', gender: 'm', avatarUrl: '' }
          ],
          points: 90
        },
        {
          id: 4,
          players: [
            { id: 7, firstName: 'Dax', lastName: 'Lowery', gender: 'm', avatarUrl: '' },
            { id: 8, firstName: 'Kessa', lastName: 'McNaught', gender: 'f', avatarUrl: '' }
          ],
          points: 60
        },
        {
          id: 5,
          players: [
            { id: 5, firstName: 'Maddie', lastName: 'Lee', gender: 'f', avatarUrl: '' },
            { id: 11, firstName: 'David', lastName: 'Strom', gender: 'm', avatarUrl: '' }
          ],
          points: 50
        },
        {
          id: 6,
          players: [
            { id: 9, firstName: 'Dan', lastName: 'Somers', gender: 'm', avatarUrl: '' },
            { id: 2, firstName: 'Andrea', lastName: 'Burkhardt', gender: 'f', avatarUrl: '' }
          ],
          points: 30
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'filters'
    ]),
    isFilterDoubles () {
      return this.filters.find(f => f.name === FILTERS.PLAYERS.TYPE && f.value === 'doubles') || true
    },
    playersDoublesSorted () {
      const teams = this.playersDoubles

      return teams
    },
    playersSinglesSorted () {
      const players = this.playersSingles
      players.sort((a, b) => (a.points < b.points) ? 1 : -1)

      return players
    }
  }
}
</script>
