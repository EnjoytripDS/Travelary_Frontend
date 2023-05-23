<template>
  <v-timeline>
    <v-timeline-item v-for="n in 4" :key="n" large>
      <template v-slot:icon>
        <v-avatar>
          <img src="https://i.pravatar.cc/64" />
        </v-avatar>
      </template>
      <template v-slot:opposite>
        <span>Tus eu perfecto</span>
      </template>

      <v-card class="mx-auto" max-height="350" max-width="500">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="160px"
          cover
        ></v-img>

        <v-card-title> Top western road trips </v-card-title>

        <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
