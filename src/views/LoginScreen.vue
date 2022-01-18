<template>
  <b-container>
    <b-row style="margin-top: 30px">
      <b-col>
        <b-card>
          <b-card-header>
            <b-card-title>Login</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-form @submit="login">
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="auth.email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input
                  id="password"
                  type="password"
                  v-model="auth.password"
                  required
                ></b-form-input>
              </b-form-group>
              <b-button
                @click="login"
                variant="outline-info"
                size="lg"
                style="margin-top: 10px"
                >Login</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable no-unused-vars */
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
import { LoginAPI } from "../api/BaseAPI";

export default {
  name: "LoginScreen",
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      test: [],
    };
  },
  mounted() {},
  methods: {
    login() {
      let component = this;
      LoginAPI.login(component.auth)
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.name);
            // this.$router.push({ name: "home" });
            this.$router.push("/dashboard");
            // window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>