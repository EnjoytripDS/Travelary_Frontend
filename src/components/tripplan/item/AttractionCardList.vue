<template>
  <v-container>
    <v-card class="mx-auto" max-height="350" max-width="500" @click="showOnMap(attractionItem)">
      <v-img :src="attractionItem.firstImage" height="160px" cover></v-img>

      <v-card-title> {{ attractionItem.title }}</v-card-title>

      <v-card-subtitle>{{ attractionItem.addr1 }}</v-card-subtitle>

      <v-card-actions>
        <!-- <v-btn color="orange-lighten-2" variant="text" @click="showDetails(attractionItem.id)"> DETAILS </v-btn> -->
        <div class="text-center">
          <v-dialog v-model="dialog" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="orange-lighten-2" variant="text" @click="showDetails(attractionItem.id)" v-bind="attrs" v-on="on"> DETAILS </v-btn>
              <!-- <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on"> Click Me </v-btn> -->
            </template>

            <v-card>
              <v-card-title class="text-h3 grey lighten-2"> {{ detailsData && detailsData.title }} </v-card-title>
              <v-card-subtitle class="text-h5 grey lighten-2">{{ detailsData && detailsData.addr1 }}</v-card-subtitle>
              <v-img :src="detailsData && detailsData.firstImage" height="160px" cover></v-img>

              <v-row>
                <v-card-text class="text-h6 grey lighten-2">
                  {{ detailsData && detailsData.overview }}
                </v-card-text>
              </v-row>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="text-h5" text @click="dialog = false"> 닫기 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-spacer></v-spacer>

        <v-btn class="sx-2 click-cursor" fab dark color="indigo" @click="addPlan(attractionItem)">
          <v-icon dark> mdi-heart </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  props: {
    attractionItem: Object,
  },
  data() {
    return {
      dialog: false,
      detailsData: null,
    };
  },
  methods: {
    ...mapActions("TripPlanStore", ["addPlan"]),
    showOnMap(attractionItem) {
      this.$emit("showOnMap", attractionItem);
    },
    showDetails(contentId) {
      // console.log(contentId);
      const API_URI = `http://localhost:9999/api/v1/search/${contentId}`;
      axios({
        url: API_URI,
        method: "get",
      })
        .then((response) => {
          // console.log(response);
          this.detailsData = response.data.data; // 가져온 데이터를 detailsData에 할당
          this.dialog = true; // dialog 열기
          // console.log(this.detailsData.overview);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
