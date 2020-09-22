<template>
  <v-container v-if="!isLoading" fluid class="pa-0">

    <!-- <v-bottom-navigation
      app
      v-model="tournamentBottomNav"
      grow
      mandatory
    >
      <v-btn value="details">
        <span>Details</span>
        <v-icon>mdi-card-text-outline</v-icon>
      </v-btn>
      <v-btn value="players">
        <span>Players</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn value="draws">
        <span>Draws</span>
        <v-icon>mdi-tournament</v-icon>
      </v-btn>
      <v-btn value="results">
        <span>Results</span>
        <v-icon>mdi-table</v-icon>
      </v-btn>
    </v-bottom-navigation> -->

    <v-row no-gutters>
      <v-col
        cols="12"
        md="10" offset-md="1"
        lg="8" offset-lg="2"
        class="pb-4">

      <v-row
        no-gutters
        :class="{
          'px-2 py-3': $vuetify.breakpoint.xsOnly,
          'my-4': $vuetify.breakpoint.smAndUp
        }"
      >
        <!-- <v-col>
          <NavBack text="Back to Tournaments" routeName="tournaments" />
        </v-col> -->
        <v-col cols="auto">
          <h2>Lazy Cup 2020</h2>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end">
          <v-btn color="info" :to="{ name: 'addMatch' }">+ Match</v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col
          cols="12"
          :class="{'mb-6': $vuetify.breakpoint.smAndUp}"
          class="px-0"
        >
          <v-expansion-panels
            accordion
            multiple
            :value="[0,1]"
          >
            <v-expansion-panel class="mb-6">

              <v-expansion-panel-header color="primary">
                <v-row no-gutters>
                  <v-col>
                    <h2 class="white--text">Standings</h2>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left"></th>
                        <th class="text-left"></th>
                        <th class="text-left header">Player</th>
                        <th class="text-left header">Matches Won</th>
                        <th class="text-left header">Games Won</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(player, i) in standingsSorted"
                        :key="`${player.firstName}${player.lastName}`"
                        :class="[{ 'winner-row': isTopPlayer(i) }, { 'top-row': isTopPlayer(i) }]"
                      >
                        <td class="data-rank">
                          <h3 :class="{ 'data-top mt-1': isTopPlayer(i) }">#{{ i + 1 }}</h3>
                        </td>
                        <td>
                          <v-img
                            width="100"
                            :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
                          ></v-img>
                        </td>
                        <td :class="['data-name', {'data-top mt-1': isTopPlayer(i) }]">{{ getFullName(player) }}</td>
                        <td
                          align="center"
                          :class="['data-score', {'data-top mt-1': isTopPlayer(i) }]"
                        >
                          {{ player.matchesWon }}
                        </td>
                        <td
                          align="center"
                          :class="['data-score', {'data-top mt-1': isTopPlayer(i) }]"
                        >
                          {{ displayGamesWon(player.gamesWon.won, player.gamesWon.of) }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <!-- <v-list subheader>
                  <v-list-item
                    v-for="(player, i) in players"
                    :key="`${player.firstName}${player.lastName}`"
                    :class="{ 'row-leader-divider': i + 1 < players.length }"
                  >
                    <v-list-item-icon>
                      <h3 :class="{ 'rank-top mt-1': i === 0 }">#{{ i + 1 }}</h3>
                    </v-list-item-icon>

                    <v-list-item-avatar>
                      <v-img
                        :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="getFullName(player)"></v-list-item-title>
                    </v-list-item-content>

                  </v-list-item>
                </v-list> -->

                <!-- <v-row no-gutters class="stats-top pt-3 pb-2">
                  <v-col cols="6" align="center">
                    <h3 class="text-capitalize">Matches Won</h3>
                    <p>{{ displayMatchWinPercentage }}</p>
                  </v-col>
                  <v-col cols="6" align="center">
                    <h3 class="text-capitalize">Games Won</h3>
                    <p>{{ gamesPlayed }}</p>
                  </v-col>
                </v-row> -->

              </v-expansion-panel-content>

            </v-expansion-panel>

            <PlayerMatches />
          </v-expansion-panels>

        </v-col>
      </v-row>

      <!-- <TournamentDetails v-if="tournamentBottomNav === 'details'" :tournament="tournament" />
      <TournamentPlayers v-else-if="tournamentBottomNav === 'players'" :tournament="tournament" />
      <TournamentDraws v-else-if="tournamentBottomNav === 'draws'" :tournament="tournament" />
      <TournamentResults v-else-if="tournamentBottomNav === 'results'" :tournament="tournament" /> -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import PlayerMatches from '@/components/PlayerMatches'
// import NavBack from '@/components/NavBack'
// import TournamentDetails from '@/components/TournamentDetails'
// import TournamentDraws from '@/components/TournamentDraws'
// import TournamentPlayers from '@/components/TournamentPlayers'
// import TournamentResults from '@/components/TournamentResults'
import { getPrecisionPercentage } from '@/utils/functions'

export default {
  name: 'tournament',
  components: {
    PlayerMatches
    // NavBack
    // TournamentDetails,
    // TournamentDraws,
    // TournamentPlayers,
    // TournamentResults
  },
  data() {
    return {
      players: [
        { id: 6, gender: 'm', firstName: 'Alex', lastName: 'Fohl' },
        { id: 8, gender: 'm', firstName: 'Tyler', lastName: 'Edmonds' },
        { id: 2, gender: 'm', firstName: 'George', lastName: 'Go' },
        { id: 7, gender: 'm', firstName: 'Chris', lastName: 'Layton' },
        { id: 1, gender: 'm', firstName: 'Daniel', lastName: 'Lomelino' },
        { id: 3, gender: 'm', firstName: 'Dax', lastName: 'Lowery' },
        { id: 9, gender: 'f', firstName: 'Lisa', lastName: 'Martin' },
        { id: 4, gender: 'f', firstName: 'Kessa', lastName: 'McNaught' }
      ],
      standings: [],
      stats: []
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'stat',
      'tournament',
      'tournamentNav'
    ]),
    standingsSorted() {
      // TODO: sort players by matches won
      // TODO: sort players by game percentage
      const sortedPlayers = []
      Object.assign(sortedPlayers, this.players)
      sortedPlayers.sort((a, b) => (a.matchesWon < b.matchesWon)
        ? 1
        : (a.lastName === b.lastName)
          ? ((a.firstName > b.firstName) ? 1 : -1)
          : -1
      )
      return sortedPlayers
    },
    tournamentBottomNav: {
      get() {
        return this.tournamentNav
      },
      set(newValue) {
        this.setTournamentNav(newValue)
      }
    }
  },
  methods: {
    ...mapActions([
      'getMatches',
      'getStat',
      'getTournament'
    ]),
    ...mapMutations([
      'setLoading',
      'setTournament',
      'setTournamentNav'
    ]),
    attachGamesWon() {
      this.stats[1].doubles.forEach(statPlayer => {
        // attach number of games won/played to each player
        const player = this.players.find(player => player.id === statPlayer.id)
        if (player) {
          player.gamesWon = {
            won: statPlayer.hits,
            of: statPlayer.of
          }
        }
      })
    },
    attachMatchesWon() {
      this.stats[0].doubles.forEach(statPlayer => {
        // attach number of matches won to each player
        const player = this.players.find(player => player.id === statPlayer.id)
        if (player) {
          player.matchesWon = statPlayer.hits
        }
      })
    },
    displayGamesWon(num, denom) {
      if (!denom) {
        return '0/0'
      }

      return `${num}/${denom} (${getPrecisionPercentage(num, denom).toFixed(2)}%)`
    },
    getFullName(player) {
      return `${player.firstName} ${player.lastName}`
    },
    getGamesWon(playerId) {
      return '15/20 (75%)'
    },
    isTopPlayer(i) {
      return i < 4
    }
  },
  async created() {
    this.setLoading(true)
    // Match Win %
    await this.getStat({ statId: 1 })
    this.stats.push(this.stat)
    // Games Played
    await this.getStat({ statId: 4 })
    this.stats.push(this.stat)
    // Attach stats to each player
    this.attachMatchesWon()
    this.attachGamesWon()
    // All matches
    await this.getMatches('doubles')
    this.setLoading(false)
  },
  destroyed() {
    // this.setTournament({})
    // this.setTournamentNav('details')
  }
}
</script>

<style scoped lang="sass">
.row-leader-divider
  border-bottom: 1px solid #e0e0e0
.header
  font-size: 12pt !important
.winner-row
  background-color: darken(white, 10%) !important
  font-weight: bold
// .top-row
//   background-color: darken(white, 40%)
//   color: white
//   font-weight: bold
.data-rank
  font-size: 14pt !important
.data-name
  font-size: 14pt !important
.data-score
  font-size: 14pt !important
.data-top
  font-size: 18pt !important
</style>
