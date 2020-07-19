<template>
  <v-row no-gutters class="mb-1">
    <v-col>

      <!-- <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 1"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreakerSet="onChangeTiebreakerSet"
        class="mb-2" />
 -->
      <v-row no-gutters class="mb-2" align="center">

        <v-col cols="6" class="ml-2">
          <v-row no-gutters v-for="player in side.players" :key="player.id">
            <v-col>
              <a :href="`/players/${player.id}`">{{ player.firstName }} {{ player.lastName }}</a>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row no-gutters>
            <v-col cols="2" v-for="(score, i) in side.games" :key="i" align="center">
              <h3>{{ score }}</h3>
            </v-col>
          </v-row>
        </v-col>

      </v-row>

      <v-divider v-if="$vnode.key < (side.players.length - 1)"></v-divider>
      <!-- <AddSetsTiebreakerRow
        v-show="showTiebreakerRows && Number(side) === 2"
        :side="side"
        :numSets="numSets"
        :onChangeTiebreakerSet="onChangeTiebreakerSet"
        class="mt-2" /> -->

    </v-col>
  </v-row>

</template>

<script>
export default {
  name: 'setsRow',
  props: ['side']
}
</script>
