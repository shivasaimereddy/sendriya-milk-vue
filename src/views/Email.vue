<template>
  <div>
    <div style="margin-bottom: 10px">
      <b-button
        variant="outline-info btn-lg"
        id="showModal"
        @click="showModal = true"
      >
        New Email
      </b-button>
      <div v-if="showModal">
        <b-modal
          v-model="showModal"
          ref="modal"
          @ok="sendEmail"
          id="modal-prevent-closing"
          :visible="showModal"
        >
          <template #modal-title>Send Email</template>
          <b-row>
            <b-col>
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Subject" label-for="subject">
                <b-form-input
                  id="subject"
                  v-model="subject"
                  type="text"
                  placeholder="Subject"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Message" label-for="message">
                <b-form-textarea
                  id="message"
                  v-model="body"
                  rows="3"
                  placeholder="Message"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-cell-click="onCellClick"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span
          style="cursor: pointer; margin: auto; display: table"
          v-if="props.column.field == 'status'"
        >
          <i
            v-if="props.row.status"
            class="fas fa-check-circle text-success"
          ></i>
          <i v-else class="fas fa-times-circle text-danger"></i>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>


<script>
import { EmailAPI } from "../api/BaseAPI";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "Email",
  components: { VueGoodTable },

  data() {
    return {
      showModal: false,
      columns: [],
      rows: [],
      email: "",
      subject: "",
      body: "",
    };
  },
  mounted() {
    this.getColumns();
    this.getData();
  },
  methods: {
    getColumns() {
      let component = this;
      EmailAPI.getColumns().then((response) => {
        component.columns = response.data;
      });
    },
    getData() {
      let component = this;
      EmailAPI.getData().then((response) => {
        component.rows = response.data;
      });
    },
    sendEmail() {
      let data = {
        email: this.email,
        subject: this.subject,
        body: this.body,
      };
      EmailAPI.sendEmail(data).then((response) => {
        let component = this;
        //show success message
        component.getData();
      });
    },
    onCellClick(params) {
      if (params.column.field == "status") {
        let component = this;
        let data = { id: params.row.id };
        if (params.row.status == false) {
          EmailAPI.resendEmail(data)
            .then((response) => {
              component.getData();
            })
            .catch((error) => {
              //show alert box with error message
              alert(error.response.data.message);
            });
        }
      }
    },
  },
};
</script>

<style>
</style>