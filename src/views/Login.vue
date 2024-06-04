<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2" class="pb-4">
        <v-row
          no-gutters
          :class="{
            'px-2 py-2': $vuetify.breakpoint.xsOnly,
            'my-4': $vuetify.breakpoint.smAndUp,
          }"
        >
          <v-col>
            <h1>Log In</h1>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col>
            <v-card outlined class="mb-2">
              <v-row no-gutters class="mb-3">
                <v-col> </v-col>
              </v-row>

              <v-row no-gutters class="mb-2" align="center">
                <v-col cols="5" class="pl-4"> </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4 mr-4">
          <v-col align="right">
            <v-btn color="info" @click.prevent="onLogin">Log In</v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onLogin() {
      this.login()
    }
  }
}
</script>
