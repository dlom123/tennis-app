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
            <h1>Locations</h1>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'locations'
}
</script>
