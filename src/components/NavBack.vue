<template>
  <v-btn
    class="pl-0"
    small
    text
    :to="{ name: routeName }"
  >
    <v-icon left>mdi-chevron-left</v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'navBack',
  props: ['routeName', 'text']
}
</script>

<style scoped lang="sass">
.v-btn:before, .v-btn:hover:before, .v-btn:focus:before
  background-color: transparent
</style>
