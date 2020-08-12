<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="10" offset-md="1"
        lg="8" offset-lg="2"
        class="pb-4">

        <v-row
          no-gutters
          :class="{
            'px-2 py-2': $vuetify.breakpoint.xsOnly,
            'my-4': $vuetify.breakpoint.smAndUp
          }"
        >
          <v-col>
            <h1>Racquet Pile</h1>
          </v-col>
        </v-row>

        <v-row no-gutters class="mb-2">

          <v-col cols="6" :class="['mt-3', {'pl-1': $vuetify.breakpoint.xsOnly}]">
            <v-btn-toggle
              v-model="matchType"
              dense
              mandatory
              color="blue"
            >
              <v-btn value="singles" title="Singles racquet pile">Singles</v-btn>
              <v-btn value="doubles" title="Doubles racquet pile">Doubles</v-btn>
            </v-btn-toggle>
          </v-col>

        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-select
              v-model="selectedPlayers"
              :items="itemsPlayers"
              label="Choose Players"
              multiple
              chips
            ></v-select>
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

        <v-row no-gutters class="mt-4 mr-4">
          <v-col align="right">
            <v-btn color="info" @click="onGo">Go!</v-btn>
          </v-col>
        </v-row>

        <v-row v-show="matchups.length">
          <v-col>
            <v-row v-for="(matchup, i) in matchups" :key=i>
              <v-col>
                {{ matchup[0] }}/{{ matchup[1] }} vs. {{ matchup[2] }}/{{ matchup[3] }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
      const players = this.players.map(player => {
        const fullName = `${player.firstName} ${player.lastName}`
        return {
          text: fullName,
          value: fullName
        }
      })
      return players
    }
  },
  methods: {
    ...mapActions([
      'getLocations',
      'getPlayers'
    ]),
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
    onGo() {
      this.matchups = []
      if (this.view === 'doubles') {
        while (this.selectedPlayers.length > 0 && !(this.selectedPlayers.length % 4)) {
          const matchup = []
          matchup.push(this.selectedPlayers.splice(Math.floor(Math.random() * this.selectedPlayers.length), 1)[0])
          matchup.push(this.selectedPlayers.splice(Math.floor(Math.random() * this.selectedPlayers.length), 1)[0])
          matchup.push(this.selectedPlayers.splice(Math.floor(Math.random() * this.selectedPlayers.length), 1)[0])
          matchup.push(this.selectedPlayers.splice(Math.floor(Math.random() * this.selectedPlayers.length), 1)[0])
          this.matchups.push(matchup)
        }
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
