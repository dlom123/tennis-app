<template>
  <v-container v-if="!isLoading" fluid class="pa-0 reserve-court">
    <v-row
      no-gutters
      :class="{
        'px-2 pt-2': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-col cols="auto" class="mr-4">
        <h1>Reserve a Court</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-col cols="auto">
        <v-autocomplete
          ref="selectLocation"
          label="Where?"
          placeholder="Select location..."
          :items="locations"
          :dense="$vuetify.breakpoint.xsOnly"
          item-text="name"
          item-value="id"
          outlined
          hide-selected
          hide-details
          background-color="white"
          v-model="searchLocation"
        >
          <!-- <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <v-img
                  :src="
                    require(`../assets/images/headshots/${
                      data.item.gender === 'm' ? 'men' : 'women'
                    }/silhouette.png`)
                  "
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.fullName"></v-list-item-title>
              </v-list-item-content>
            </template>
          </template> -->
        </v-autocomplete>
      </v-col>

      <v-col cols="auto">
        <v-menu
          ref="date-menu"
          v-model="dateMenu"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="When?"
              placeholder="Choose a date"
              prepend-icon="mdi-calendar"
              readonly
              hide-details
              v-bind="attrs"
              v-on="on"
              :value="displaySearchDate"
            >
            </v-text-field>
          </template>
          <v-date-picker v-model="searchDate" no-title></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="mb-4">
        <v-slider
          v-model="searchDuration"
          :tick-labels="durationsTicksLabels"
          :max="3"
          step="1"
          dense
          label="For how long?"
          ticks="always"
          tick-size="4"
          thumb-label="always"
          hide-details
          @change="onChangeDuration"
        >
          <template v-slot:thumb-label="{ value }">
            {{ value }}
          </template>
        </v-slider>
        <!-- <v-btn-toggle v-model="searchDuration" mandatory color="primary">
          <v-btn value="30">30min</v-btn>
          <v-btn value="60">1 hour</v-btn>
          <v-btn value="90">1.5 hours</v-btn>
          <v-btn value="120">2 hours</v-btn>
        </v-btn-toggle> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="auto">
        <v-btn color="info" @click.prevent="onClickFindCourt"
          >Find a Court</v-btn
        >
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col>
        <h2>Search Results</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="results">
        <!-- v-for="(location, i) in searchResults"
          :key="i" -->
        <v-card outlined class="mb-2">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              <h2>Indianapolis Racquet Club (Dean Rd)</h2>
            </v-toolbar-title>
          </v-toolbar>

          <v-row no-gutters class="mb-2">
            <v-col cols="3" class="mt-2 px-4 pt-2 left-col">
              <v-col cols="12" class="pa-0">8249 Dean Rd</v-col>
              <v-col cols="12" class="pa-0">Indianapolis, IN 46240</v-col>
              <!-- <v-col cols="12" class="mt-4 pa-0" style="border: 1px solid black"
                >map goes here</v-col
              > -->
            </v-col>

            <v-col class="pl-4">
              <v-row no-gutters>
                <v-col class="mt-3">
                  <h3 class="mb-4">When: {{ displaySearchDate }}</h3>
                  <h3>Duration: {{ displaySearchDuration }}</h3>
                  <h3 class="mt-3">Players</h3>
                  <v-row no-gutters>
                    <v-col cols="auto">
                      <SelectPlayers :dense="true" />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12" class="py-0">
                      <SelectedPlayers :dense="true" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" class="mt-3 pr-7">
                  <v-divider></v-divider>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col>
                  <h3 class="mb-2 pt-3">Choose a start time</h3>
                  <v-item-group>
                    <v-container class="pt-0">
                      <v-row>
                        <v-col
                          v-for="(startTime, i) in startTimes"
                          :key="i"
                          cols="auto"
                          class="pa-1"
                        >
                          <v-item v-slot="{ active, toggle }">
                            <v-card
                              :color="active ? 'primary' : ''"
                              :class="[
                                active ? 'white--text font-weight-bold' : '',
                                'd-flex',
                                'align-center',
                                'px-4',
                              ]"
                              height="50"
                              @click="toggle"
                            >
                              {{ startTime }}
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-item-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <v-btn text color="primary" @click="onClickHourlyRates">
          Hourly Rates
        </v-btn>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
// import EmptyRow from '@/components/EmptyRow'
import SelectPlayers from '@/components/SelectPlayers'
import SelectedPlayers from '@/components/SelectedPlayers'
import moment from 'moment'
import locations from '@/data/locations.json'

export default {
  name: 'reserveCourt',
  components: {
    // EmptyRow
    SelectPlayers,
    SelectedPlayers
  },
  data() {
    return {
      dateMenu: false,
      durationsTicksLabels: [
        '30m',
        '1h',
        '1.5h',
        '2h'
      ],
      locations,
      searchResults: [],
      searchDate: moment().format('YYYY-MM-DD'),
      searchDuration: 1,
      searchLocation: null,
      startTimes: [
        '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
      ]
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'selectedPlayers'
    ]),
    displaySearchDate() {
      return this.searchDate ? moment(this.searchDate).format('ddd, MMM Do YYYY') : ''
    },
    displaySearchDuration() {
      return this.searchDuration
    }
  },
  methods: {
    ...mapActions([
      'getCourtAvailability'
    ]),
    ...mapMutations([
      'clearSelectedPlayers',
      'setLoading'
    ]),
    onChangeDuration() {
      console.log(this.durations)
    },
    async onClickFindCourt() {
      console.log('FINDING A COURT...')
      console.log(`Reserving a court at ${this.searchLocation} on ${this.searchDate} for ${this.searchDuration} minutes.`)
      const location = await this.getCourtAvailability({
        locationId: this.searchLocation,
        date: this.searchDate,
        duration: this.searchDuration
      })
      if (!location) {
        console.log('error getting location for id ', this.searchLocation)
        return
      }
      this.searchResults.push(location)
      console.log(this.searchResults)
    },
    onClickHourlyRates() {
      console.log('HOURLY RATES...COMING RIGHT UP!')
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // reset selected players if specified through the router
      if (to.params.clearSelectedPlayers) {
        vm.clearSelectedPlayers()
      }
    })
  },
  async created() {
    // this.setLoading(true)

    // set default Location to user's home location
    // TODO: change this to actually get the user's home location
    this.searchLocation = 3
    this.onClickFindCourt()

    // this.setLoading(false)
  },
}
</script>
