<template>
  <v-virtual-scroll :items="items" :item-height="380" height="800">
    <v-card class="mx-auto" max-height="350" max-width="500">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="160px"
        cover
      ></v-img>

      <v-card-title> Top western road trips </v-card-title>

      <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text"> DETAILS </v-btn>

        <v-spacer></v-spacer>

        <v-btn class="sx-2" fab dark color="indigo">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-virtual-scroll>
</template>

<script>
export default {
  props: {
    attrs: {},
  },
  data() {
    return {
      items: [
        {
          text: "관광지",
        },
        {
          text: "문화시설",
        },
        {
          text: "축제공연행사",
        },
        {
          text: "여행코스",
        },
        {
          text: "레포츠",
        },
        {
          text: "숙박",
        },
        {
          text: "쇼핑",
        },
        {
          text: "음식점",
        },
      ],
    };
  },
};
</script>

<style></style>
