<template>
  <v-container class="home-container" fluid>
    <v-row justify="center" align="center" class="home-contents">
      <v-col cols="5">
          <p class="home-title"> EnjoyTrip</p>
          <p>우리의 일정 관리 서비스는 최상의 여행 경험을 위해 여행 일정을 체계적으로 관리하도록 도와드립니다.</p>
          <p>저희와 함께라면 여행 일정 작성은 더 이상 골치거리가 되지 않을 것입니다.</p>
          <p>지금 바로 여행 계획을 시작해보세요</p>
          <p>당신의 꿈 같은 여행이 기다리고 있습니다.</p>
          <v-btn class="gotripmaking" color="blue" @click="toTripMaking">내 여행 만들기</v-btn>
      </v-col>
      <v-col cols="6">
          <v-carousel>
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "AppHome",
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
    methods: {
      toTripMaking() {
        this.$router.push({ name: "trip-plan" }).catch(() => {});
      }
    },
  }
</script>

<style scoped>
.home-container {
  height: 80vh;
}

.home-contents {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-title {
  color: blue;
  font-size: 62px;
  margin-bottom: 16px;
}

p {
  margin-bottom: 12px;
  font-size: 20px;
}

.gotripmaking {
  margin-left: 150px;
  margin-top: 15px;
  color: white;
}
</style>
