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
            <h1>Add a Match</h1>
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
              <v-btn value="singles" title="Add a singles match">Singles</v-btn>
              <v-btn value="doubles" title="Add a doubles match">Doubles</v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="4">
            <v-menu
              v-model="showDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Date"
                  v-model="date"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="showDateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <!-- <v-col cols="4">
            <v-checkbox v-model="includeTime" class="mx-2" label="Include Time"></v-checkbox>
          </v-col> -->

        </v-row>

        <!-- <v-row no-gutters v-show="includeTime">
          <v-col cols="4">
            <v-menu
              ref="timeMenu"
              v-model="showTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  prepend-icon="mdi-clock"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="showTimeMenu"
                v-model="time"
                :allowed-minutes="[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]"
                :ampm-in-title="true"
                @click:minute="$refs.timeMenu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row> -->

        <v-row no-gutters>
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
        </v-row>

        <v-row no-gutters :class="{'px-1': $vuetify.breakpoint.xsOnly}">
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
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              class="mx-auto pb-2"
              outlined
            >
              <v-toolbar flat color="blue" dark class="mb-4">
                <v-toolbar-title><h2>Sets</h2></v-toolbar-title>
              </v-toolbar>

              <AddSetsRow
                :numPlayersPerSide="numPlayersPerSide"
                :updatePlayer="updatePlayer"
                :updateSet="updateSet"
                :updateTiebreaker="updateTiebreaker"
                :showTiebreakerRows="showTiebreakerRows"
                side="1" />

              <v-divider></v-divider>

              <AddSetsRow
                :numPlayersPerSide="numPlayersPerSide"
                :updatePlayer="updatePlayer"
                :updateSet="updateSet"
                :updateTiebreaker="updateTiebreaker"
                :showTiebreakerRows="showTiebreakerRows"
                side="2"
                class="pb-2" />

              <v-divider></v-divider>

              <v-row no-gutters>
                <v-col class="pl-2 pt-1">
                  <v-btn
                    text
                    x-small
                    color="blue"
                    @click="showTiebreakerRows = !showTiebreakerRows"
                  >
                    <template v-if="!showTiebreakerRows">
                      Show tiebreaker scores
                    </template>
                    <template v-else>
                      Hide tiebreaker scores
                    </template>
                  </v-btn>
                </v-col>
              </v-row>

            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4 mr-4">
          <v-col align="right">
            <v-btn color="info" @click="onSubmitMatch">Submit</v-btn>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddSetsRow from '@/components/AddSetsRow'

export default {
  name: 'addMatch',
  components: {
    AddSetsRow
  },
  data() {
    return {
      date: null,
      includeTime: false,
      location: {},
      locationSetting: null,
      locationSettings: [],
      locationSurface: null,
      locationSurfaces: [],
      matchSides: [
        { sets: [{}, {}, {}, {}, {}] },
        { sets: [{}, {}, {}, {}, {}] }
      ],
      matchType: 'singles',
      showDateMenu: false,
      showTiebreakerRows: false,
      showTimeMenu: false,
      time: null
    }
  },
  computed: {
    ...mapState([
      'locations',
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
    numPlayersPerSide() {
      return this.matchType === 'singles' ? 1 : 2
    }
  },
  methods: {
    ...mapActions([
      'addMatch',
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
    async onSubmitMatch() {
      const matchData = {
        type: this.matchType,
        date: this.date,
        locationId: this.location.id,
        setting: this.locationSetting,
        surface: this.locationSurface
      }

      // remove unused, blank placeholder sets
      this.matchSides = this.matchSides.map(side => {
        const filteredSets = side.sets.filter(set => set.hasOwnProperty('seq'))

        return {
          ...side,
          sets: filteredSets
        }
      })

      if (this.matchType === 'singles') {
        // attach players data for a singles match
        matchData.players = this.matchSides
      } else {
        // attach teams data for a doubles match
        matchData.teams = this.matchSides
      }

      await this.addMatch(matchData)

      // reload the screen
      this.$router.go()
    },
    updatePlayer(side, seq, player) {
      const thisSide = this.matchSides[side - 1]
      if (this.matchType === 'singles') {
        // update player in a singles context (player)
        thisSide.id = player.id
      } else {
        // update player in a doubles context (team player)
        if (!thisSide.hasOwnProperty('playerIds')) {
          thisSide.playerIds = [null, null]
        }
        thisSide.playerIds[seq - 1] = player.id
      }
    },
    updateSet(side, seq, score) {
      const thisSet = this.matchSides[side - 1].sets[seq - 1]
      thisSet.seq = seq
      thisSet.score = score
    },
    updateTiebreaker(side, seq, score) {
      this.matchSides[side - 1].sets[seq - 1].tiebreakerScore = score
    }
  },
  async created() {
    this.matchType = this.view === 'singles' ? 'singles' : 'doubles'
    await this.getLocations()
    await this.getPlayers()
  }
}
</script>
