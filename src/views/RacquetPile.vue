<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2" class="pb-4">

        <v-row no-gutters :class="{
            'px-2 py-2': $vuetify.breakpoint.xsOnly,
            'my-4': $vuetify.breakpoint.smAndUp
          }">
          <v-col>
            <h1>Racquet Pile</h1>
          </v-col>
        </v-row>

        <v-row no-gutters class="mb-5">

          <v-col cols="6" :class="['mt-3', {'pl-1': $vuetify.breakpoint.xsOnly}]">
            <v-btn-toggle v-model="matchType" dense mandatory color="blue">
              <v-btn value="singles" title="Singles racquet pile">Singles</v-btn>
              <v-btn value="doubles" title="Doubles racquet pile">Doubles</v-btn>
            </v-btn-toggle>
          </v-col>

        </v-row>

        <!-- <v-row no-gutters>
          <v-col cols="12" :class="{'px-1': $vuetify.breakpoint.xsOnly}">
            <v-autocomplete
              label="Location"
              v-model="location"
              outlined
              clearable
              background-color="white"
              hide-selected
              open-on-clear
              placeholder="Select a location..."
              :items="itemsLocations"
              :dense="$vuetify.breakpoint.xsOnly"
              @change="onChangeLocation"
            ></v-autocomplete>
          </v-col>
        </v-row> -->

        <!-- <v-row no-gutters :class="{'px-1': $vuetify.breakpoint.xsOnly}">
          <v-col v-show="locationSettings.length && locationSurfaces.length" cols="6" class="pr-2">
            <v-select
              label="Setting"
              placeholder="Choose setting"
              outlined
              v-model="locationSetting"
              dense
              background-color="white"
              :disabled="locationSettings.length === 1"
              :items="locationSettings"
            ></v-select>
          </v-col>
          <v-col v-show="locationSettings.length && locationSurfaces.length" cols="6" class="pl-2">
            <v-select
              label="Surface"
              placeholder="Choose surface"
              outlined
              v-model="locationSurface"
              dense
              background-color="white"
              :disabled="locationSurfaces.length === 1"
              :items="locationSurfaces"
            ></v-select>
          </v-col>
        </v-row> -->

        <v-row no-gutters class="px-1">
          <v-col>
            <v-autocomplete ref="selectPlayers" label="Players" placeholder="Select players..." :items="itemsPlayers"
              :dense="$vuetify.breakpoint.xsOnly" item-text="fullName" item-value="id" clearable outlined hide-selected
              background-color="white" @change="onChangeSelectPlayer">
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <v-img :src="getPlayerAvatar(data.item)"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.fullName"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-list subheader>
              <v-subheader>{{ numSelectedPlayersText }}</v-subheader>

              <v-list-item v-for="player in selectedPlayers" :key="player.id">
                <v-list-item-avatar>
                  <v-img :src="getPlayerAvatar(player)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="getFullName(player)"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon @click="onClickRemovePlayer(player.id)">
                  <v-icon>mdi-close</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row no-gutters v-show="matchups.length" class="mt-4">
          <v-col cols="12" class="pl-2">
            <h2>Matchups</h2>
          </v-col>

          <v-col>
            <v-card v-for="(matchup, i) in matchups" :key=i outlined class="mb-2">
              <v-row no-gutters class="mb-3">
                <v-col>
                  <v-row no-gutters class="blue white--text font-weight-bold">
                    <v-col class="px-2 pt-1">Court #{{ i + 1 }}</v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters class="mb-2" align="center">

                <v-col cols="5" class="pl-4">
                  <v-row no-gutters v-for="player in matchup[0]" :key="player.id">
                    <v-col>
                      {{ getFullName(player) }}
                    </v-col>
                  </v-row>
                </v-col>

                <v-col align="center">
                  vs.
                </v-col>

                <v-col cols="5" class="ml-2 pr-4" align="right">
                  <v-row no-gutters v-for="player in matchup[1]" :key="player.id">
                    <v-col>
                      {{ getFullName(player) }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4 mr-4">
          <v-col align="right">
            <v-btn color="info" @click.prevent="onGo">Go</v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>

          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getPlayerAvatar } from '@/utils/functions'

export default {
  name: 'racquetPile',
  data() {
    return {
      location: {},
      locationSetting: null,
      locationSettings: [],
      locationSurface: null,
      locationSurfaces: [],
      matchType: 'singles',
      matchups: [],
      selectedPlayers: []
    }
  },
  computed: {
    ...mapState([
      'locations',
      'players',
      'view'
    ]),
    itemsLocations() {
      const locations = this.locations.map(location => {
        return {
          text: location.name,
          value: location
        }
      })
      return locations
    },
    itemsPlayers() {
      const players = this.players.filter(player => !this.selectedPlayers.includes(player))
        .map(player => {
          return {
            ...player,
            fullName: this.getFullName(player)
          }
        })
      return players
    },
    numSelectedPlayersText() {
      const numSelected = this.selectedPlayers.length
      return `${numSelected || 'No '} player${numSelected !== 1 ? 's' : ''} selected`
    }
  },
  methods: {
    ...mapActions([
      'getLocations',
      'getPlayers'
    ]),
    displayPlayerName(player) {
      return `${player.firstName[0].toUpperCase()}. ${player.lastName}`
    },
    getFullName(player) {
      return `${player.firstName} ${player.lastName}`
    },
    getPlayerAvatar,
    onChangeLocation(location) {
      this.locationSetting = null
      this.locationSurface = null
      this.locationSettings = []
      this.locationSurfaces = []

      if (location) {
        this.locationSettings = location.settings
        this.locationSurfaces = location.surfaces

        if (location.settings.length === 1) {
          // if there is only one location setting, select it by default
          this.locationSetting = location.settings[0]
        }
        if (location.surfaces.length === 1) {
          // if there is only one location surface, select it by default
          this.locationSurface = location.surfaces[0]
        }
      }
    },
    onChangeSelectPlayer(value) {
      if (value) {
        const player = this.players.find(player => player.id === value)
        this.selectedPlayers.push(player)
        this.$refs.selectPlayers.reset()
      }
    },
    onClickRemovePlayer(playerId) {
      this.selectedPlayers = this.selectedPlayers.filter(player => player.id !== playerId)
    },
    onGo() {
      let playersPerCourt = 0
      this.matchups = []
      if (this.matchType === 'doubles') {
        playersPerCourt = 4
      } else {
        playersPerCourt = 2
      }

      // make a copy of selectedPlayers to destructively access (slice) without affecting the UI
      const playerPile = [...this.selectedPlayers]
      while (playerPile.length > 0 && playerPile.length >= playersPerCourt) {
        // draw racquets for both sides of a court and add to players to the matchups array
        const matchup = []
        for (let i = 0; i < 2; i++) {
          // draw one side at a time, twice to fill the court
          const side = []
          for (let i = 0; i < playersPerCourt / 2; i++) {
            side.push(playerPile.splice(Math.floor(Math.random() * playerPile.length), 1)[0])
          }
          matchup.push(side)
        }
        this.matchups.push(matchup)
      }
    }
  },
  async created() {
    this.matchType = this.view === 'singles' ? 'singles' : 'doubles'
    await this.getLocations()
    await this.getPlayers()
  }
}
</script>
