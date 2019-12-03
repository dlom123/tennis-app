<template>
  <v-col cols="12" class="container-stats">
    <v-row no-gutters>
      <v-col sm="12">
        <h1>Team Stats</h1>
      </v-col>
    </v-row>

    <v-row no-gutters class="stats-top">

      <v-col sm="2">
        <v-row>

          <v-col cols="12" align="right">
            <strong>Aces</strong>
          </v-col>

          <v-col cols="12" align="right">
            <strong>Winners</strong>
          </v-col>

        </v-row>
      </v-col>

      <v-col sm="4" class="col-stat">
        <v-row>

          <v-col cols="12">
            22
          </v-col>

          <v-col cols="12">
            24
          </v-col>

        </v-row>
      </v-col>

      <v-col sm="2">
        <v-row>

          <v-col cols="12" align="right">
            <strong>Double Faults</strong>
          </v-col>

          <v-col cols="12" align="right">
            <strong>Unforced Errors</strong>
          </v-col>

        </v-row>
      </v-col>

      <v-col sm="4" class="col-stat">
        <v-row>

          <v-col cols="12">
            13
          </v-col>

          <v-col cols="12">
            19
          </v-col>

        </v-row>
      </v-col>

    </v-row>

    <v-row no-gutters>
      <v-col sm="2">

        <v-row>
          <v-col cols="12" align="right">
            <strong>1st Serve In</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>1st Serve Return</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>2nd Serve Return</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>1st Serve Points Won</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>2nd Serve Points Won</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>Net Points Won</strong>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" align="right">
            <strong>Break Points Won</strong>
          </v-col>
        </v-row>

      </v-col>

      <v-col sm="10" class="col-stat">

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="62"
            >
              <strong>62%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="78"
            >
              <strong>78%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="96"
            >
              <strong>96%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="72"
            >
              <strong>72%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="53"
            >
              <strong>53%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="35"
            >
              <strong>35%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-progress-linear
              height="25"
              value="60"
            >
              <strong>60%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-col>
</template>
