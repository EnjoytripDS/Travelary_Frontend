<template>
  <v-container>
    <v-card class="mx-auto" max-height="350" max-width="500">
      <v-img :src="attractionItem.firstImage" height="160px" cover></v-img>

      <v-card-title> {{ attractionItem.title }}</v-card-title>

      <v-card-subtitle>{{ attractionItem.addr1 }}</v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text"> DETAILS </v-btn>

        <v-spacer></v-spacer>

        <template v-if="selectState == 0">
          <v-btn
            class="sx-2 click-cursor"
            fab
            dark
            color="green"
            @click="addTimeLines(attractionItem)"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            class="sx-2 click-cursor"
            fab
            dark
            color="indigo"
            @click="addTimeLines(attractionItem)"
          >
            <v-icon dark> mdi-minus </v-icon>
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    attractionItem: Object,
  },
  data() {
    return {
      selectState: 0,
    }
  },
  methods: {
    addTimeLines(attractionItem) {
      this.selectState = 1 - this.selectState;
      this.$store.dispatch("TripPlanStore/addTimeLines", attractionItem);
      this.attraction = attractionItem; //////////////////////////////////////
    },
  },
};
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
