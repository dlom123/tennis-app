<template>
  <v-text-field
  solo
  dense
  hide-details
  clearable
  append-icon="mdi-magnify"
  :placeholder=placeholder
  v-debounce="onChange"
  @click:clear="onClear"
  ></v-text-field>
</template>

<script>
export default {
  name: 'searchInput',
  props: ['onChange', 'onClear', 'placeholder']
}
</script>
