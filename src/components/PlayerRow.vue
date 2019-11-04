<template>
  <v-col :key="`${player.id}`" sm="12" style="padding: 0;">
    <v-row no-gutters>

      <v-col sm="3" style="position: relative;">

        <h1
          :class="textHeaderClass(player.gender)"
          style="position: absolute; top: 20px; left: 20px; font-size: 46px;"
        >{{ player.id }}</h1>

        <v-img
          :src="require(`../assets/images/headshots/placeholders/${player.gender === 'm' ? 'men' : 'women'}/${player.gender === 'm' ? 'federer' : 'halep'}.png`)"
          max-height="250"
          contain
        >
        </v-img>

      </v-col>

      <v-col sm="9">

        <v-row no-gutters>

          <v-col sm="12" style="margin-top: 20px;">
            <h1 :class="textHeaderClass(player.gender)">{{player.firstName}} {{player.lastName}}</h1>
          </v-col>

          <v-col sm="6">

            <v-row no-gutters style="margin-top: 20px;">

              <v-col sm="12">
                <h3 :class="textHeaderClass(player.gender)">Points</h3>
              </v-col>
              <v-col sm="12">
                540
              </v-col>

            </v-row>

            <v-row no-gutters style="margin-top: 20px;">

              <v-col sm="12">
                <h3 :class="textHeaderClass(player.gender)">Matches Played</h3>
              </v-col>
              <v-col sm="12">
                35
              </v-col>

            </v-row>

          </v-col>

          <v-col sm="6">

            <v-row no-gutters style="margin-top: 20px;">

              <v-col sm="12">
                <h3 :class="textHeaderClass(player.gender)">Rating</h3>
              </v-col>
              <v-col sm="12">
                4.0
              </v-col>

            </v-row>

          </v-col>

        </v-row>

      </v-col>

    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'playerRow',
  props: ['player'],
  methods: {
    textHeaderClass (gender) {
      return { textMen: gender === 'm', textWomen: gender === 'f' }
    }
  }
}
</script>
