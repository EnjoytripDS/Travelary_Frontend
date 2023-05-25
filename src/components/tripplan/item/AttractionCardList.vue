<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-height="350"
      max-width="500"
      @click="showOnMap(attractionItem)"
    >
      <v-img :src="attractionItem.firstImage" height="160px" cover></v-img>

      <v-card-title> {{ attractionItem.title }}</v-card-title>

      <v-card-subtitle>{{ attractionItem.addr1 }}</v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text"> DETAILS </v-btn>

        <v-spacer></v-spacer>

        <template v-if="addState == 0">
          <v-btn
            class="sx-2 click-cursor"
            fab
            dark
            color="indigo"
            @click="addCard(attractionItem)"
          >
            <v-icon dark> mdi-heart </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            class="sx-2 click-cursor"
            fab
            color="red"
            @click="addCard(attractionItem)"
          >
            <v-icon color="white"> mdi-heart </v-icon>
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    attractionItem: Object,
  },
  data() {
    return {
      addState: 0,
    }
  },
  methods: {
    ...mapActions("TripPlanStore", ["addPlan"]),
    showOnMap(attractionItem) {
      this.$emit("showOnMap", attractionItem);
    },
    addCard(attractionItem) {
      this.addState = 1 - this.addState;
      this.addPlan(attractionItem);
    }
  },
};
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
