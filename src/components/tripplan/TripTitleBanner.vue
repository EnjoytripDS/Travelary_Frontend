<template>
  <v-row>
    <v-row>
      <v-img height="200" src="@/assets/image/tripimage.jpg">
        <v-col class="text-right" cols="12">
          <v-menu bottom left transition="slide-y-transition"> </v-menu>
        </v-col>
        <v-row class="pa-4" justify="center">
          <v-col class="text-center">
            <h1 class="text-h3">
              {{ trip.tripName }}
            </h1>
          </v-col>
        </v-row>
      </v-img>
    </v-row>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

const TripPlanStore = "TripPlanStore";

export default {
  computed: {
    ...mapState(TripPlanStore, ["trip"]),
  },
};
</script>

<style></style>
