<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <div style="margin-top: 10px; margin-left: 30px">
        <v-avatar class="md-4" color="grey darken-1" size="100">
          <v-img
            aspect-ratio="80"
            src="https://firebasestorage.googleapis.com/v0/b/storage-2bc38.appspot.com/o/profile.jpeg?alt=media&token=bea5e838-231d-4138-b132-833e8b4eea1a"
          ></v-img>
        </v-avatar>
      </div>

      <div style="margin-top: 10px; margin-left: 20px">{{ user }}</div>
    </v-sheet>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text] in menu" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="redirect">
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ConstantsAPI } from "../api/BaseAPI";

export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      user: localStorage.getItem("user"),
      menu: [],
    };
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    redirect(e) {
      this.$router.push(e.target.innerText.toLowerCase());
    },
    getMenu() {
      let component = this;
      ConstantsAPI.menu().then((response) => {
        component.menu = response.data;
      });
    },
  },
};
</script>

<style scoped></style>
