<template>
  <v-breadcrumbs :items="items" class="breadcrumbs">
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
