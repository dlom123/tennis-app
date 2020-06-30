<template>
  <v-btn-toggle
    dense
    mandatory
    color="blue"
    :value="view"
    @change="onChangeToggle"
  >
    <v-btn value="singles" title="Show singles data only">Singles</v-btn>
    <v-btn value="doubles" title="Show doubles data only">Doubles</v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'toggleSinglesDoubles',
  computed: {
    ...mapState([
      'view'
    ])
  },
  methods: {
    ...mapMutations([
      'setView'
    ]),
    onChangeToggle() {
      const newView = this.view === 'doubles' ? 'singles' : 'doubles'
      this.setView(newView)
    }
  }
}
</script>
