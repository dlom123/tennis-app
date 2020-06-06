<template>
  <v-breadcrumbs large :items="items" class="pa-0">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'breadcrumbs',
  props: ['items']
}
</script>

<style scoped lang="sass">
ul
  font-family: 'Oswald', sans-serif
</style>
