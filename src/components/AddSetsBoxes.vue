<template>
  <v-col class="py-0 my-auto ml-2">
    <v-row no-gutters>
      <v-col
        cols="2"
        v-for="n in numSets" :key="n"
        class="pa-0 mr-1"
      >
        <v-text-field
          type="number"
          min="0"
          outlined
          flat
          dense
          hide-details
          solo
          @input="(score) => onChangeSet(n, score)"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'setBoxes',
  props: [
    'numSets',
    'onChangeSet'
  ]
}
</script>
