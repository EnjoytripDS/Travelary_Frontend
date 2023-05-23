<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable> 여행 정보 입력 </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2" editable> 관광지 검색 </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable> 일자별 세부 계획 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <trip-title-banner></trip-title-banner>
          <v-row>
            <v-col>
              <v-text-field v-model="trip.tripName" filled label="Name"></v-text-field>
            </v-col>
          </v-row>
          <trip-info-form></trip-info-form>
          <v-btn color="primary" @click="e1 = 2"> 다음 단계 </v-btn>
          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="2">
          <trip-title-banner></trip-title-banner>
          <v-col cols="4">
            <search-attraction margin="0"></search-attraction>
          </v-col>
          <v-col cols="8">
            <the-kakao-map :attractions="attractions"></the-kakao-map>
          </v-col>

          <v-btn color="primary" @click="e1 = 3"> 다음 단계 </v-btn>
          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <trip-title-banner></trip-title-banner>
          <v-row>
            <v-col cols="3"> <attraction-list></attraction-list></v-col>
            <v-col cols="9">
              <v-card>
                <v-tabs v-model="tab" background-color="deep-purple accent-4" centered dark icons-and-text>
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab href="#tab-1">
                    Recents
                    <v-icon>mdi-phone</v-icon>
                  </v-tab>

                  <v-tab href="#tab-2">
                    Favorites
                    <v-icon>mdi-heart</v-icon>
                  </v-tab>

                  <v-tab href="#tab-3">
                    Nearby
                    <v-icon>mdi-account-box</v-icon>
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
                    <v-card>
                      <v-card><TripTimeline /></v-card>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="e1 = 1"> 여행 만들기! </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-row>
      <!-- <v-col cols="4">
        <search-attraction margin="0"></search-attraction>
      </v-col>
      <v-col cols="8">
        <the-kakao-map :attractions="attractions"></the-kakao-map>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import SearchAttraction from "@/components/tripplan/SearchAttraction.vue";
import TripTimeline from "@/components/tripplan/TripTimeline.vue";
import AttractionList from "@/components/tripplan/AttractionList.vue";
import TripInfoForm from "@/components/tripplan/TripInfoForm.vue";
import TripTitleBanner from "@/components/tripplan/TripTitleBanner.vue";

import { mapState } from "vuex";

const TripPlanStore = "TripPlanStore";

export default {
  name: "AppTripPlan",
  components: {
    TheKakaoMap,
    SearchAttraction,
    TripTimeline,
    AttractionList,
    TripInfoForm,
    TripTitleBanner,
  },
  data() {
    return {
      attractions: [],
      e1: 1,
    };
  },
  computed: {
    ...mapState(TripPlanStore, ["trip"]),
  },
};
</script>

<style></style>
