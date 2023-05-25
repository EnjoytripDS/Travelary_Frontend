<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" right>
      <v-tab>1일차</v-tab>
      <v-tab>2일차</v-tab>
      <v-tab>3일차</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container fluid>
          <!-- <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row> -->

          <v-timeline align-top dense>
            <v-timeline-item color="teal lighten-3" small>
              <v-row class="pt-1">
                <v-col cols="3">
                  <v-img :src="timeAttr && timeAttr.image"></v-img>
                </v-col>
                <v-col>
                  <strong>제목</strong>
                  <div class="text-caption mb-2">주소</div>
                  <v-avatar>
                    <!-- 이미지 -->
                    <v-img :src="timeAttr && timeAttr.firstImage"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
