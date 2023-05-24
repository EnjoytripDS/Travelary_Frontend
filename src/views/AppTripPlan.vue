<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          여행 정보 입력
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2" editable>
          관광지 검색
        </v-stepper-step>
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
              <v-text-field
                v-model="trip.tripName"
                filled
                label="여행 제목"
              ></v-text-field>
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
              <search-attraction
                margin="0"
                @showOnMap="showOnMap"
              ></search-attraction>
            </v-col>
            <v-col cols="8">
              <the-kakao-map
                :attractions="attractions"
                :options="mapOption"
              ></the-kakao-map>
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
              <selected-attraction-card-list
                v-for="(tripAttr, index) in selectedAttractions"
                :key="index"
                :attractionItem="tripAttr"
              ></selected-attraction-card-list
            ></v-col>
            <v-col cols="8">
              <v-card>
                <v-tabs color="deep-purple accent-4" right>
                  <!--v-row로 일자 index // 일주일 넘어가면... 몰루..(예외처리 안함)-->
                  <v-row v-for="(n, index) in calNumberOfDays" :key="index">
                    <v-tab @click="focusDay(index + 1)"
                      >{{ index + 1 }}일차</v-tab
                    >
                  </v-row>

                  <v-tab-item
                    v-for="(n, index) in calNumberOfDays"
                    :key="index"
                  >
                    <trip-timeline
                      :day="index + 1"
                      @pushAttrByDay="pushAttrByDay"
                    ></trip-timeline>
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
import TripTimeline from "@/components/tripplan/TripTimeline.vue";
import SelectedAttractionCardList from "@/components/tripplan/item/SelectedAttractionCardList.vue";

import { mapGetters, mapState } from "vuex";

export default {
  name: "AppTripPlan",
  components: {
    TheKakaoMap,
    SearchAttraction,
    TripInfoForm,
    TripTitleBanner,
    TripTimeline,
    SelectedAttractionCardList,
  },
  data() {
    return {
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 7,
      },
      attractions: [],
      e1: 1,
      step3ListTitle: "선택한 관광지",
    };
  },
  methods: {
    showOnMap(attractionItem) {
      console.log("찍었을 때 이제 AppTripPlan.vue까지 옴");
      console.log(attractionItem.latitude);
      console.log(attractionItem.longitude);
      this.mapOption.center.lat = attractionItem.latitude;
      this.mapOption.center.lat = attractionItem.longitude;
    },
    clickFirstBtn() {
      this.e1 = 2;
    },
    focusDay(day) {
      this.$store.dispatch("TripPlanStore/focusDay", day);
    },
    pushAttrByDay(attractionItem) {
      console.log("pushAttraction");
      console.log(attractionItem);
    },
  },
  computed: {
    ...mapState("TripPlanStore", ["trip", "selectedAttractions", "focusDay"]),
    ...mapGetters({
      calNumberOfDays: "TripPlanStore/calNumberOfDays",
    }),
  },
};
</script>

<style>
.content-padding {
  padding-top: 40px;
}
</style>
