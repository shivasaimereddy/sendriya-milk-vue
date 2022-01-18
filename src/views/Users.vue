<template>
  <div>
    <vue-good-table :columns="columns" :rows="rows">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'Active'">
          <i
            v-if="props.row.Active"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
        <span v-else-if="props.column.field == 'Admin'">
          <i
            v-if="props.row.Admin"
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
  },
};
</script>

<style>
</style>