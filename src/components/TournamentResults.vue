<template>
  <v-container fluid>

    <v-row>
      <v-col cols="12" class="blue white--text">
        <h2>{{ tournament.name }}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h3>Results</h3>
      </v-col>
    </v-row>

    <v-row no-gutters class="pt-2">
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'tournamentResults',
  props: ['tournament']
}
</script>
