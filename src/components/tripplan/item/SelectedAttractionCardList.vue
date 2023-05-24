<template>
  <v-container>
    <v-card class="mx-auto" max-height="350" max-width="500">
      <v-img :src="attractionItem.firstImage" height="160px" cover></v-img>

      <v-card-title> {{ attractionItem.title }}</v-card-title>

      <v-card-subtitle>{{ attractionItem.addr1 }}</v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text"> DETAILS </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          class="sx-2 click-cursor"
          fab
          dark
          color="green"
          @click="addTimeLines(attractionItem)"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    attractionItem: Object,
  },

  methods: {
    addTimeLines(attractionItem) {
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
