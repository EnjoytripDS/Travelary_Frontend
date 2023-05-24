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
                  <!--v-row로 일자 index // 일주일 넘어가면... 몰루..(예외처리 안함)-->
                  <v-row v-for="(n, index) in calNumberOfDays" :key="index">
                    <v-tab>{{ index + 1 }}일차</v-tab>
                  </v-row>

                  <v-tab-item v-for="(n, index) in calNumberOfDays" :key="index">
                    <v-container fluid>
                      <v-card-text class="py-0">
                        <v-timeline align-top dense>
                          <v-timeline-item color="pink" small>
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>5pm</strong>
                              </v-col>
                              <v-col>
                                <strong>New Icon</strong>
                                <div class="text-caption">Mobile App</div>
                              </v-col>
                            </v-row>
                          </v-timeline-item>

                          <v-timeline-item color="teal lighten-3" small>
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>3-4pm</strong>
                              </v-col>
                              <v-col>
                                <strong>Design Stand Up</strong>
                                <div class="text-caption mb-2">Hangouts</div>
                                <v-avatar>
                                  <v-img
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                                  ></v-img>
                                </v-avatar>
                                <v-avatar>
                                  <v-img
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                                  ></v-img>
                                </v-avatar>
                                <v-avatar>
                                  <v-img
                                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                                  ></v-img>
                                </v-avatar>
                              </v-col>
                            </v-row>
                          </v-timeline-item>

                          <v-timeline-item color="pink" small>
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>12pm</strong>
                              </v-col>
                              <v-col>
                                <strong>Lunch break</strong>
                              </v-col>
                            </v-row>
                          </v-timeline-item>

                          <v-timeline-item color="teal lighten-3" small>
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>9-11am</strong>
                              </v-col>
                              <v-col>
                                <strong>Finish Home Screen</strong>
                                <div class="text-caption">Web App</div>
                              </v-col>
                            </v-row>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
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

import { mapGetters, mapState } from "vuex";

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
    ...mapState("TripPlanStore", ["trip"]),
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
