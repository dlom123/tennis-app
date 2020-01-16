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

        <FilterBar :isDoubles="true" />

        <template v-if="teamsSorted.length">
          <TeamRow
            v-for="team in teamsSorted"
            :key="team.id"
            :team="team"
          />
        </template>
        <template v-else>
          <EmptyRow text="No teams to show." />
        </template>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import EmptyRow from '@/components/EmptyRow'
import FilterBar from '@/components/filters/FilterBar'
import Spinner from '@/components/Spinner'
import TeamRow from '@/components/TeamRow'
import { filterTeams, sortTeams } from '@/utils/functions'

export default {
  name: 'teams',
  components: {
    EmptyRow,
    FilterBar,
    Spinner,
    TeamRow
  },
  computed: {
    ...mapState([
      'filters',
      'isLoading',
      'teams'
    ]),
    teamsSorted() {
      // apply filters
      const teamsFiltered = filterTeams(this.teams, this.filters)

      // apply sorting
      const teamsSorted = sortTeams(teamsFiltered)

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

<style scoped lang="sass">
.container-main
  height: 100%
  background-color: #eee
  .row-title
    margin: 10px 0 15px 0
</style>
