<template>
  <v-container fluid>

    <FilterBarTeams/>

    <TeamRow
      v-for="(team, i) in teamsSorted"
      :key="team.id"
      :team="team"
      :ranking="i + 1"
    />

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FilterBarTeams from '@/components/FilterBarTeams.vue'
import TeamRow from '@/components/TeamRow.vue'
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
