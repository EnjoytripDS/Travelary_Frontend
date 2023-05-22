<template>
  <v-container>
    <v-row>
      <v-img height="200" src="@/assets/image/tripimage.jpg">
        <v-col class="text-right" cols="12">
          <v-menu bottom left transition="slide-y-transition"> </v-menu>
        </v-col>
        <v-row class="pa-4" justify="center">
          <v-col class="text-center">
            <h1 class="text-h3">
              {{ name }}
            </h1>
          </v-col>
        </v-row>
      </v-img>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="name" filled label="Name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-date-picker v-model="dates" range></v-date-picker>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="dateRangeText"
          label="여행 기간"
          prepend-icon="mdi-calendar"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col>
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
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
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
              <v-list-item-subtitle
                v-html="data.item.group"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-col>
  </v-container>
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
      name: "여행 제목을 작성해주세요!",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
      ],
      dates: ["2023-05-26", "2023-05-31"],
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
