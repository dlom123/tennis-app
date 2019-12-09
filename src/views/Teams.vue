<template>
  <v-container fluid class="container-main">
    <v-row no-gutters>
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
import { mapActions, mapState } from 'vuex'
import FilterBarTeams from '@/components/filters/FilterBarTeams'
import TeamRow from '@/components/TeamRow'
import { filterTeams, sortTeams } from '@/utils/functions'

export default {
  name: 'teams',
  components: {
    FilterBarTeams,
    TeamRow
  },
  computed: {
    ...mapState([
      'filters',
      'sort',
      'teams'
    ]),
    teamsSorted () {
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
    ])
  },
  created () {
    this.getTeams()
  }
}
</script>
