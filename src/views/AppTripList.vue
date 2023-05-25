<template>
  <v-container>
    <v-row class="list-trip-row"> 여행 목록 </v-row>
    <v-row>
      <!-- 9 자리에 불러온 여행 리스트 length 넣으면 됨 -->
      <v-col v-for="n in 3" :key="n" class="d-flex child-flex" cols="3">
        <v-card :loading="loading" class="mx-auto my-12">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img height="200" src="@/assets/image/tripimage.jpg"></v-img>
          <v-card-title>여행 이름</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>여행 날짜</v-card-title>
          <v-card-actions>
            <v-btn color="deep-purple" text> 자세히 보기 </v-btn>
            <v-btn color="white" depressed rounded>
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card :loading="loading" class="mx-auto my-12" height="380">
          <v-btn class="plus-trip-btn" width="200" height="200" color="white">
            <v-icon size="200"> mdi-plus-circle-outline </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AppTripList",
};
</script>

<style>
.plus-trip-btn {
  margin-top: 80px;
  margin-left: 110px;
}

.list-trip-row {
  margin-top: 50px;
  margin-left: 10px;
  font-size: 35px;
}
</style>
