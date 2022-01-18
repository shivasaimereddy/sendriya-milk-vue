<template>
  <v-app id="inspire" v-if="!this.token == ''">
    <Sidebar :drawer="drawer" />
    <Topbar @drawerEvent="drawer = !drawer" />
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  <v-app id="inspire" v-else>
    <LoginScreen />
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LoginScreen from "./views/LoginScreen.vue";
export default {
  name: "App",
  components: { Topbar, Sidebar, LoginScreen },
  data: () => ({
    token: localStorage.getItem("token"),
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  mounted() {
    console.log(this.token);
  },
  methods: {},
};
</script>
