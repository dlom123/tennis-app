<template>
  <v-row no-gutters align="center">
    <v-col cols="4" class="ml-2" align="right">
      <div class="body-2">Tiebreaker</div>
    </v-col>

    <SetBoxes :numSets="numSets" :onChangeSet="onChangeTiebreakerSet" />
  </v-row>
</template>

<script>
import SetBoxes from '@/components/SetBoxes'

export default {
  name: 'addSetsTiebreakerRow',
  components: {
    SetBoxes
  },
  props: [
    'numSets',
    'onChangeTiebreakerSet',
    'side'
  ]
}
</script>
