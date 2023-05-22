<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          관광지 검색
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" editable>
          여행 추가 정보
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" editable> 일자별 세부 계획 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-col cols="4">
            <search-attraction margin="0"></search-attraction>
          </v-col>
          <v-col cols="8">
            <the-kakao-map :attractions="attractions"></the-kakao-map>
          </v-col>

          <v-btn color="primary" @click="e1 = 2"> 다음 단계 </v-btn>

          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="2">
          <TheContentHeaderVue />

          <v-btn color="primary" @click="e1 = 3"> 다음 단계 </v-btn>

          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

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
import TheContentHeaderVue from "@/components/common/TheContentHeader.vue";
export default {
  name: "AppTripPlan",
  components: {
    TheKakaoMap,
    SearchAttraction,
    TheContentHeaderVue,
  },
  data() {
    return {
      attractions: [],
      e1: 1,
    };
  },
};
</script>

<style></style>
