<template>
  <v-row>
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg">
      <v-row>
        <v-col class="text-right" cols="12">
          <v-menu bottom left transition="slide-y-transition"> </v-menu>
        </v-col>
        <v-row class="pa-4" align="center" justify="center">
          <v-col class="text-center">
            <h3 class="text-h5">
              {{ name }}
            </h3>
            <span class="grey--text text--lighten-1">{{ title }}</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="name" filled color="blue-grey lighten-2" label="Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="title" filled color="blue-grey lighten-2" label="Title"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-date-picker v-model="dates" range></v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
                  model: {{ dates }}
                </v-col>
              </v-row>

              <template v-slot:selection="data">
                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="remove(data.item)">
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-row>
</template>
<script>
export default {
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };

    return {
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      name: "여행 계획 짜기",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
      ],
      title: "관광지를 검색하고, 내 여행 계획에 추가해보세요!",
      dates: ["2019-09-10", "2019-09-20"],
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style></style>
