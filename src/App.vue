<template>
  <v-app>

    <AppBar />

    <v-main>
      <v-container fluid class="container-main pa-0">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="8" offset-sm="2"
            md="8" offset-md="2"
            lg="8" offset-lg="2"
            xl="6" offset-xl="3"
          >

            <Spinner v-if="isLoading" :isLoading="isLoading" />
            <router-view />

          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '@/components/AppBar'
import Spinner from '@/components/Spinner'

export default {
  name: 'app',
  components: {
    AppBar,
    Spinner
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  }
}
</script>

<style scoped lang="sass">
.v-application
  font-family: 'Open Sans', sans-serif
.container-main
  height: 100%
  background-color: #eee
</style>
