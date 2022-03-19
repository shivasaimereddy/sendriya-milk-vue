<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
    >
      <template slot="table-row" slot-scope="props">
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-if="props.column.field == 'Active'"
        >
          <i
            v-if="props.row.Active"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-else-if="props.column.field == 'Admin'"
        >
          <i
            v-if="props.row.Admin"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-else-if="props.column.field == 'super_admin'"
        >
          <i
            v-if="props.row.super_admin"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { UsersAPI } from "../api/BaseAPI";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "Users",
  components: { VueGoodTable },
  data() {
    return {
      users: [],
      columns: [],
      rows: [],
    };
  },
  mounted() {
    this.getColumns();
    this.getData();
  },
  methods: {
    getData() {
      let component = this;
      UsersAPI.getData().then((response) => {
        component.rows = response.data;
      });
    },
    getColumns() {
      let component = this;
      UsersAPI.getColumns().then((response) => {
        component.columns = response.data;
      });
    },
    onCellClick(params) {
      if (params.column.field == "Active") {
        let component = this;
        let data = {
          update: "active",
          username: params.row.username,
        };
        UsersAPI.updateStatus(data).then((response) => {
          component.getData();
        });
      } else if (params.column.field == "Admin") {
        let component = this;
        let data = {
          update: "admin",
          username: params.row.username,
        };
        UsersAPI.updateStatus(data).then((response) => {
          component.getData();
        });
      } else if (params.column.field == "super_admin") {
        let component = this;
        let data = {
          update: "super_admin",
          username: params.row.username,
        };
        UsersAPI.updateStatus(data).then((response) => {
          component.getData();
        });
      }
    },
  },
};
</script>

<style>
</style>