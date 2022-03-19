<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
      theme="polar-bear"
    >
      <!-- <div slot="table-actions" style="margin-right: 30px">
        <b-button variant="info">
          <i class="fas fa-plus"></i>
          Add
        </b-button>
      </div> -->
      <template slot="table-row" slot-scope="props">
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-if="props.column.field == 'carousel'"
        >
          <i
            v-if="props.row.carousel"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-else-if="props.column.field == 'subscription'"
        >
          <!-- <md-switch v-model="boolean"></md-switch> -->

          <i
            v-if="props.row.subscription"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-else-if="props.column.field == 'edit'"
        >
          <i class="fas fa-edit"></i>
        </span>
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-else-if="props.column.field == 'delete'"
        >
          <i class="fas fa-trash text-danger"></i>
        </span>
        <span v-else-if="props.column.field == 'image'">
          <img :src="props.row.image" style="width: 50px; height: 50px" />
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Vue from "vue";
import { ProductsAPI } from "../api/BaseAPI";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
// import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default.css";
// import VueMaterial from "vue-material";

// Vue.use(VueMaterial.default);

export default {
  name: "Users",
  components: { VueGoodTable },
  data() {
    return {
      users: [],
      columns: [],
      rows: [],
      boolean: true,
    };
  },
  mounted() {
    this.getColumns();
    this.getData();
  },
  methods: {
    getData() {
      let component = this;
      ProductsAPI.getData().then((response) => {
        component.rows = response.data;
      });
    },
    getColumns() {
      let component = this;
      ProductsAPI.getColumns().then((response) => {
        component.columns = response.data;
      });
    },
    onCellClick(params) {
      if (params.column.field == "delete") {
        //show alert dialog
        this.$bvModal
          .msgBoxConfirm("Are you sure you want to delete this product?", {
            title: "Delete Product",
            size: "md",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Yes",
            cancelTitle: "No",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then(() => {
            // User clicked Yes button
            ProductsAPI.deleteProduct(params.row.pid).then((response) => {
              this.getData();
              this.$bvToast.toast("Product deleted successfully", {
                title: "Success",
                variant: "success",
                solid: true,
              });
            });
          })
          .catch(() => {
            // User clicked No button or closed the modal
          });
      } else if (params.column.field == "edit") {
        // this.$router.push({
        //   name: "EditProduct",
        //   params: {
        //     pid: params.row.pid,
        //   },
        // });
        let component = this;
        let pid = params.row.pid;
        this.$router.push("/edit/" + pid);
      } else if (params.column.field == "subscription") {
        let component = this;
        let pid = {
          update: "subscription",
          pid: params.row.pid,
        };
        ProductsAPI.updateSubscription(pid).then((response) => {
          component.getData();
          this.$bvToast.toast("Subscription updated successfully", {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } else if (params.column.field == "carousel") {
        let component = this;
        let pid = {
          update: "carousel",
          pid: params.row.pid,
        };
        ProductsAPI.updateSubscription(pid)
          .then((response) => {
            component.getData();
            this.$bvToast.toast("Carousel updated successfully", {
              title: "Success",
              variant: "success",
              solid: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-switch {
  display: flex;
}
</style>