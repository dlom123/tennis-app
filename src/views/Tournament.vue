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
      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2" class="pb-4">

        <v-row no-gutters :class="{
          'px-2 py-3': $vuetify.breakpoint.xsOnly,
          'my-4': $vuetify.breakpoint.smAndUp
        }">
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
          <v-col cols="12" :class="{'mb-6': $vuetify.breakpoint.smAndUp}" class="px-0">
            <v-expansion-panels accordion multiple :value="[0,1]">
              <v-expansion-panel class="mb-6">

                <v-expansion-panel-header color="primary">
                  <v-row no-gutters>
                    <v-col>
                      <h2 class="white--text">Standings</h2>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                  <v-row no-gutters>
                    <v-col cols="5" offset="1" class="text-left header">Player</v-col>
                    <v-col cols="3" class="text-center header">Matches Won</v-col>
                    <v-col cols="3" class="text-center header">Games Won</v-col>
                  </v-row>

                  <v-row v-for="(player, i) in standingsSorted" :key="`${player.firstName}${player.lastName}`"
                    :class="[{ 'player-row': i < standingsSorted.length-1 }, { 'winner-row': isTopPlayer(i) }, { 'top-row': isTopPlayer(i) }]">
                    <v-col cols="1" class="data-rank justify-center" align="center">
                      <h3 :class="{ 'data-top mt-1': isTopPlayer(i) }">#{{ i + 1 }}</h3>
                    </v-col>
                    <!-- <v-col cols="2" class="justify-center">
                    <v-img
                      width="100"
                      :src="require(`../assets/images/headshots/${player.gender === 'm' ? 'men' : 'women'}/silhouette.png`)"
                    ></v-img>
                  </v-col> -->
                    <v-col cols="5" :class="['data-name justify-center', {'data-top mt-1': isTopPlayer(i) }]">
                      <a :href="`/players/${player.id}`">{{ getFullName(player) }}</a>
                    </v-col>
                    <v-col cols="3" align="center"
                      :class="['data-score justify-center', {'data-top mt-1': isTopPlayer(i) }]">
                      {{ player.matchesWon }}
                    </v-col>
                    <v-col cols="3" align="center"
                      :class="['data-score justify-center', {'data-top mt-1': isTopPlayer(i) }]">
                      {{ displayGamesWon(player.gamesWon.won, player.gamesWon.of) }}
                    </v-col>
                  </v-row>

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
      const sortedPlayers = []
      Object.assign(sortedPlayers, this.players)
      sortedPlayers.sort((a, b) => {
        // decide sort order by matches won
        if (a.matchesWon > b.matchesWon) {
          return -1
        } else if (a.matchesWon < b.matchesWon) {
          return 1
        } else {
          // decide sort order by games won
          const pctA = a.gamesWon.won / a.gamesWon.of
          const pctB = b.gamesWon.won / b.gamesWon.of
          if (pctA > pctB) {
            return -1
          } else if (pctA < pctB) {
            return 1
          } else {
            // same matches and games percentage - sort by name
            if (a.lastName < b.lastName) {
              return -1
            } else if (a.lastName > b.lastName) {
              return 1
            } else {
              // same last name - sort by first name
              if (a.firstName < b.firstName) {
                return -1
              } else if (a.firstName > b.firstName) {
                return 1
              }
            }
          }
        }
      })

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
      'setTournamentNav',
      'setView'
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
    // force a doubles view since this tournament is only for doubles
    this.setView('doubles')
    // Match Win %
    await this.getStat({ statId: 1 })
    this.stats.push(this.stat)
    // Games Played
    await this.getStat({ statId: 4 })
    this.stats.push(this.stat)
    // Attach stats to each player
    await this.attachMatchesWon()
    await this.attachGamesWon()
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
a
  text-decoration: none
.header
  font-size: 10pt !important
.player-row
  border-bottom: 1px solid #aaa
.winner-row
  background-color: darken(white, 10%) !important
  font-weight: bold
// .top-row
//   background-color: darken(white, 40%)
//   color: white
//   font-weight: bold
.data-rank
  // font-size: 14pt !important
.data-name
  // font-size: 14pt !important
.data-score
  // font-size: 14pt !important
.data-top
  // font-size: 18pt !important
</style>
