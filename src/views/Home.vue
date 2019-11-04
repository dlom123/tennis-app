<template>
  <v-container fluid>
    <v-row no-gutters v-for="(player, i) in players" :key="player.id">
      <v-col :key="`${player.id}`" sm="12">
        <v-row no-gutters>

          <v-col sm="3" style="position: relative;">

            <h1
              style="position: absolute; top: 20px; left: 20px; font-size: 46px;"
            >{{ i + 1 }}</h1>

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
                <h1>{{player.firstName}} {{player.lastName}}</h1>
              </v-col>

              <v-col sm="6">

                <v-row no-gutters style="margin-top: 20px;">

                  <v-col sm="12">
                    <h3>Points</h3>
                  </v-col>
                  <v-col sm="12">
                    540
                  </v-col>

                </v-row>

                <v-row no-gutters style="margin-top: 20px;">

                  <v-col sm="12">
                    <h3>Matches Played</h3>
                  </v-col>
                  <v-col sm="12">
                    35
                  </v-col>

                </v-row>

              </v-col>

              <v-col sm="6">

                <v-row no-gutters style="margin-top: 20px;">

                  <v-col sm="12">
                    <h3>Rating</h3>
                  </v-col>
                  <v-col sm="12">
                    4.0
                  </v-col>

                </v-row>
                <!-- <v-row no-gutters style="margin-top: 20px;">

                  <v-col sm="12">
                  </v-col>

                </v-row> -->

              </v-col>

            </v-row>

          </v-col>

        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      players: [
        { id: 1, firstName: 'Doug', lastName: 'Brown', gender: 'm', avatarUrl: '' },
        { id: 2, firstName: 'Andrea', lastName: 'Burkhardt', gender: 'f', avatarUrl: '' }
        // { id: 3, firstName: 'Alex', lastName: 'Fohl', gender: 'm', avatarUrl: '' },
        // { id: 4, firstName: 'Chris', lastName: 'Layton', gender: 'm', avatarUrl: '' }
        // { id: 5, firstName: 'Maddie', lastName: 'Lee', gender: 'f', avatarUrl: '' },
        // { id: 6, firstName: 'Daniel', lastName: 'Lomelino', gender: 'm', avatarUrl: '' },
        // { id: 7, firstName: 'Dax', lastName: 'McNaught', gender: 'f', avatarUrl: '' },
        // { id: 9, firstName: 'Dan', lastName: 'Somers', gender: 'm', avatarUrl: '' },
        // { id: 10, firstName: 'Heidi', lastName: 'Somers', gender: 'f', avatarUrl: '' },
        // { id: 10, firstName: 'David', lastName: 'Strom', gender: 'm', avatarUrl: '' },
        // { id: 10, firstName: 'Emily', lastName: 'Wandel', gender: 'f', avatarUrl: '' },
        // { id: 10, firstName: 'Tony', lastName: 'Winkler', gender: 'm', avatarUrl: '' }
      ]
    }
  }
}
</script>
