<template>
  <v-container fluid class="px-0 pb-0">

    <v-row class="mx-0">
      <v-col cols="12" class="blue white--text">
        <h2>{{ tournament.name }}</h2>
      </v-col>
    </v-row>

    <v-row class="mx-0">
      <v-col cols="12">
        <h3>Draws</h3>
      </v-col>
    </v-row>

    <v-row no-gutters class="pt-2 mx-0">
      <v-col cols="12">
        <TournamentGroupCard />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'tournamentDraws',
  props: ['tournament']
}
</script>

<style scoped lang="sass">
.group-row div
.group-cell-heading-top
  border-bottom: 2px solid #aaa
  font-weight: bold
.group-cell-heading-left
  padding: 4px 0
  border-right: 2px solid #aaa
  font-weight: bold
.group-cell
  padding: 4px 0
  border-right: 2px solid #aaa
  border-bottom: 2px solid #aaa
  background-color: white
.blocked
  background-color: #aaa
</style>
