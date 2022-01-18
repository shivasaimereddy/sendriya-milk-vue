<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <div>
        <v-btn color="success" id="showModal" @click="showModal = true">
          Menu
        </v-btn>
        <div v-if="showModal">
          <b-modal id="modal-prevent-closing" :visible="showModal">
            <template #modal-title> Modify Menu </template>
          </b-modal>
        </div>
      </div>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert dense text type="success">
          Welcome
          <strong>{{ this.user }}</strong>
        </v-alert>
        <v-row>
          <v-col lg="6" cols="12" v-for="(item, index) in counts" :key="index">
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>Last 3 weeks</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.count }}</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">A Product has delivered!</div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            caption="Recent Order list"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.action="">
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ProductsAPI } from "../api/BaseAPI";

export default {
  name: "Dashboard",
  data() {
    return {
      showModal: false,
      user: localStorage.getItem("user"),
      counts: [],
    };
  },
  mounted() {
    this.getCounts();
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    getCounts() {
      let component = this;
      ProductsAPI.getCounts().then((response) => {
        component.counts = response.data;
      });
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>