/* eslint-disable no-unused-vars */
// import API from './API';
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
// import BACKEND_URL from "../../public/config.js";
// let BACKEND_URL = "https://sendriyamilk.com/"
let BACKEND_URL = "http://localhost:8000/"

export class BaseAPI {
    static getHostUrl() {
        return BACKEND_URL
    }
}

export class LoginAPI extends BaseAPI {
    static getBaseUrl() {
        return this.getHostUrl() + "api/auth/"
    }
    static login(data) {
        return axios.post(this.getBaseUrl() + 'login/', data)
    }
    static register(data) {
        return axios.post(this.getBaseUrl() + 'users/register_user/', data)
    }
}

export class UsersAPI extends BaseAPI {
    static getBaseUrl() {
        return this.getHostUrl() + "api/auth/"
    }
    static getUsers() {
        return axios.get(this.getBaseUrl() + 'userlist/')
    }
    static getColumns() {
        return axios.get(this.getBaseUrl() + 'userlist/columns/')
    }
    static getData() {
        return axios.get(this.getBaseUrl() + 'userlist/data/')
    }
}

export class ProductsAPI extends BaseAPI {
    static getBaseUrl() {
        return this.getHostUrl() + 'api/data/'
    }
    static getProducts(pid) {
        return axios.get(this.getBaseUrl() + `admin/${pid}/`)
    }
    static getCounts() {
        return axios.get(this.getBaseUrl() + 'admin/counts/')
    }
    static getColumns() {
        return axios.get(this.getBaseUrl() + 'admin/columns/')
    }
    static getData() {
        return axios.get(this.getBaseUrl() + 'admin/data/')
    }
    static deleteProduct(id) {
        return axios.delete(this.getBaseUrl() + 'admin/' + id + '/')
    }
}

export class ConstantsAPI extends BaseAPI {
    static getBaseUrl() {
        return this.getHostUrl() + 'api/constants/'
    }
    static menu() {
        return axios.get(this.getBaseUrl() + 'menu/')
    }
}

export default {
    LoginAPI,
    ProductsAPI
}