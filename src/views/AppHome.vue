<template>
  <v-container class="home-container">
    <v-row>
      <v-col>
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item
            src="@/assets/image/home/home2.jpg"
          ></v-carousel-item>
          <v-carousel-item
            src="@/assets/image/home/home3.jpg"
          ></v-carousel-item>
          <v-carousel-item
            src="https://post-phinf.pstatic.net/MjAxODA0MDhfMjk4/MDAxNTIzMTE0NjAwMDA2.5Ad-oBplJG6GlH8d2E7kUn9Db6qzuuPmtbWHTB-i_FYg.z0reFj2I6v5xCre6FvzFUfxLBqyUmyhZYBM1SRZQ-UAg.JPEG/Gyeongju-travel-information-ending.jpg?type=w1200"
          ></v-carousel-item>
          <v-carousel-item
            src="@/assets/image/home/home4.jpg"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- <v-col cols="5">
  <p class="home-title"> EnjoyTrip</p>
  <p>우리의 일정 관리 서비스는 최상의 여행 경험을 위해 여행 일정을 체계적으로 관리하도록 도와드립니다.</p>
  <p>저희와 함께라면 여행 일정 작성은 더 이상 골치거리가 되지 않을 것입니다.</p>
  <p>지금 바로 여행 계획을 시작해보세요</p>
  <p>당신의 꿈 같은 여행이 기다리고 있습니다.</p>
  <v-btn class="gotripmaking" color="blue" @click="toTripMaking">내 여행 만들기</v-btn>
</v-col> -->

<script>
export default {
  name: "AppHome",
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    toTripMaking() {
      this.$router.push({ name: "trip-plan" }).catch(() => {});
    },
  },
};
</script>

<style scoped></style>
