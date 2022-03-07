<template>
  <v-col>
    <p class="mb-0 text-body-2">
      <strong class="mr-2">Hours</strong>
      <v-btn text x-small :ripple="false" @click="onClickShowAllHours">
        ({{ showHoursText }})
      </v-btn>
    </p>
    <p class="mb-4 text-body-2">7:00 - 21:30</p>
  </v-col>
</template>

<script>
export default {
  name: 'hoursOfOperation',
  data() {
    return {
      showAllHours: false
    }
  },
  computed: {
    showHoursText() {
      return this.showAllHours ? 'Show Today' : 'Show All'
    }
  },
  methods: {
    onClickShowAllHours() {
      this.showAllHours = !this.showAllHours
    }
  }
}
</script>
