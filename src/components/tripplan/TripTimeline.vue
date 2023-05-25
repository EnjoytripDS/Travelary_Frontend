<template>
  <v-container fluid>
    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item color="teal lighten-3" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <v-img
                  :src="timeAttr && timeAttr.image"
                ></v-img>
            </v-col>
            <v-col>
              <strong>{{timeAttr.title}}</strong>
              <div class="text-caption mb-2">{{timeAttr.address}}</div>
              <v-avatar>
                <v-img
                  :src="timeAttr && timeAttr.firstImage"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    day: Number,
    timeAttr: Object,
  },

};
</script>

<style></style>
