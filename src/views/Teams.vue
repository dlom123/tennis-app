<template>
  <v-container fluid class="container-main">

    <Spinner :isLoading="isLoading" />

    <v-row v-if="!isLoading" no-gutters>
      <v-col sm="10" offset-sm="1">

        <v-row no-gutters class="row-title">
          <v-col cols="12">
            <h1>Teams</h1>
          </v-col>
        </v-row>

        <FilterBarTeams/>

        <TeamRow
          v-for="(team, i) in teamsSorted"
          :key="team.id"
          :team="team"
          :ranking="i + 1"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import FilterBarTeams from '@/components/filters/FilterBarTeams'
import Spinner from '@/components/Spinner'
import TeamRow from '@/components/TeamRow'
import { filterTeams, sortTeams } from '@/utils/functions'

export default {
  name: 'teams',
  components: {
    FilterBarTeams,
    Spinner,
    TeamRow
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'sort',
      'teams'
    ]),
    teamsSorted() {
      // apply filters
      const teamsFiltered = filterTeams(this.teams, this.filters)

      // apply sorting
      const teamsSorted = sortTeams(teamsFiltered, this.sort)

      return teamsSorted
    }
  },
  methods: {
    ...mapActions([
      'getTeams'
    ]),
    ...mapMutations([
      'removeAllFiltersExcept',
      'setLoading',
      'setTeams'
    ])
  },
  async created() {
    // clear all filters except for the ones for this screen (in case of a refresh)
    this.removeAllFiltersExcept(['teams'])

    this.setLoading(true)
    await this.getTeams()
    this.setLoading(false)
  },
  destroyed() {
    this.setTeams([])
  }
}
</script>
