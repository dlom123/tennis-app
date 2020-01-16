<template>
  <v-btn-toggle
    group
    :value="view"
    @change="onChangeToggle"
  >
    <v-btn value="singles"><h3>Singles</h3></v-btn>
    <v-btn value="doubles"><h3>Doubles</h3></v-btn>
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
