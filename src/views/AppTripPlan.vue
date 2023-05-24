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
          <v-row>
            <trip-title-banner></trip-title-banner>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="trip.tripName" filled label="여행 제목"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <trip-info-form></trip-info-form>
          </v-row>
          <v-btn color="primary" @click="clickFirstBtn"> 다음 단계 </v-btn>
          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <trip-title-banner></trip-title-banner>
          </v-row>
          <v-row class="content-padding">
            <v-col cols="4">
              <search-attraction margin="0"></search-attraction>
            </v-col>
            <v-col cols="8">
              <the-kakao-map :attractions="attractions"></the-kakao-map>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="e1 = 3"> 다음 단계 </v-btn>
          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <trip-title-banner></trip-title-banner>

          <v-row class="content-padding">
            <v-col cols="4">
              <h3>{{ step3ListTitle }}</h3>
              <attraction-card-list v-for="(tripAttr, index) in trip.tripAttractions" :key="index" :attractionItem="tripAttr"></attraction-card-list
            ></v-col>
            <v-col cols="8">
              <v-card>
                <v-tabs color="deep-purple accent-4" right>
                  <v-tab>Landscape</v-tab>
                  <v-tab>City</v-tab>
                  <v-tab>Abstract</v-tab>

                  <v-tab-item v-for="n in 3" :key="n">
                    <v-container fluid>
                      <v-row>
                        <v-col v-for="i in 6" :key="i" cols="12" md="4">
                          <v-img
                            :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                            aspect-ratio="1"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="e1 = 1"> 여행 만들기! </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-row> </v-row>
  </v-container>
</template>

<script>
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import SearchAttraction from "@/components/tripplan/SearchAttraction.vue";
import TripInfoForm from "@/components/tripplan/TripInfoForm.vue";
import TripTitleBanner from "@/components/tripplan/TripTitleBanner.vue";
import AttractionCardList from "@/components/tripplan/item/AttractionCardList.vue";

import { mapState } from "vuex";

const TripPlanStore = "TripPlanStore";
export default {
  name: "AppTripPlan",
  components: {
    TheKakaoMap,
    SearchAttraction,
    TripInfoForm,
    TripTitleBanner,
    AttractionCardList,
  },
  data() {
    return {
      attractions: [],
      e1: 1,
      step3ListTitle: "선택한 관광지",
    };
  },
  methods: {
    clickFirstBtn() {
      this.e1 = 2;
    },
  },
  computed: {
    ...mapState(TripPlanStore, ["trip"]),
  },
};
</script>

<style>
.content-padding {
  padding-top: 40px;
}
</style>
