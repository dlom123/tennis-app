<template>
  <v-row no-gutters align="center">
    <v-col cols="4" class="ml-2" align="right">
      <div class="body-2">Tiebreaker</div>
    </v-col>

    <AddSetsBoxes :numSets="numSets" :onChangeSet="onChangeTiebreaker" />
  </v-row>
</template>

<script>
import AddSetsBoxes from '@/components/AddSetsBoxes'

export default {
  name: 'addSetsTiebreakerRow',
  components: {
    AddSetsBoxes
  },
  props: [
    'numSets',
    'onChangeTiebreaker',
    'side'
  ]
}
</script>
