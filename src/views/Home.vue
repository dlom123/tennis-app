<template>
  <v-container fluid class="pa-0">
    <v-row
      no-gutters
      :class="{
        'px-2 py-2': $vuetify.breakpoint.xsOnly,
        'my-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-col>
        <h1>Home</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home'
}
</script>
