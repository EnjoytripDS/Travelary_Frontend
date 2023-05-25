<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {},

  data() {
    return {
      map: null,
      positions: [],
      markers: [],
    };
  },
  props: {
    options: Object,
    attractions: [],
  },
  watch: {
    // 관광지 클릭시 해당 위치로 이동
    "options.center"(cur) {
      this.map.setCenter(new kakao.maps.LatLng(cur.lat, cur.lng));
    },
    attractions() {
      console.log("관광지", this.attractions);
      this.loadMaker();
    },
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },

  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1cccbd19d9988f4fffd6cd3757aead1c&autoload=false`;
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");

      // this.map = new window.kakao.maps.Map(container, options);
      const { center, level } = this.options;
      this.map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level,
      });
      //   this.loadMaker();
    },
    // 지정한 위치에 마커 불러오기
    loadMaker() {
      // 현재 표시되어있는 marker들이 있다면 marker에 등록된 map을 없애준다.
      console.log("1111");
      this.deleteMarker();
      console.log("2222");
      // 마커 이미지를 생성합니다
      var imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      const imgSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 마커를 생성합니다
      this.markers = [];
      this.positions = this.attractions;
      console.log("포지션", this.positions);
      // 마커들의 중심 좌표를 계산하기 위한 변수들 초기화

      this.positions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(position.latitude, position.longitude), // 마커 표시 위치
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커의 이미지
        });
        this.markers.push(marker);
        // 마커들의 좌표를 더해줌
      });
      console.log("마커수 ::: " + this.markers.length);
    },
    deleteMarker() {
      console.log("마커 싹 지우자!!!", this.markers.length);
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          console.log(item);
          item.setMap(null);
        });
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 1180px;
  height: 1100px;
}
</style>
