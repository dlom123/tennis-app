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
import { filterTeams } from '@/utils/functions'

export default {
  name: 'teams',
  components: {
    FilterBarTeams,
    TeamRow
  },
  computed: {
    ...mapState([
      'filters',
      'teams'
    ]),
    teamsSorted () {
      // apply filters
      const teamsFiltered = filterTeams(this.teams, this.filters)

      return teamsFiltered
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
