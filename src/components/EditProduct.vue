<template>
  <div>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input
          type="text"
          class="form-control"
          id="productName"
          v-model="this.product.name"
          placeholder="Enter product name"
        />
      </div>
      <div class="form-group">
        <label for="productPrice">Product Price</label>
        <input
          type="text"
          class="form-control"
          id="productPrice"
          v-model="productPrice"
          placeholder="Enter product price"
        />
      </div>
      <div class="form-group">
        <label for="productDescription">Product Description</label>
        <input
          type="text"
          class="form-control"
          id="productDescription"
          v-model="productDescription"
          placeholder="Enter product description"
        />
      </div>
      <div class="form-group">
        <label for="productImage">Product Image</label>
        <input
          type="text"
          class="form-control"
          id="productImage"
          v-model="productImage"
          placeholder="Enter product image"
        />
      </div>
      <div class="form-group">
        <label for="productCategory">Product Category</label>
        <input
          type="text"
          class="form-control"
          id="productCategory"
          v-model="productCategory"
          placeholder="Enter product category"
        />
      </div>
      <div class="form-group">
        <label for="productQuantity">Product Quantity</label>
        <input
          type="text"
          class="form-control"
          id="productQuantity"
          v-model="productQuantity"
          placeholder="Enter product quantity"
        />
      </div>
      <div class="form-group">
        <label for="productActive">Product Active</label>
        <input
          type="text"
          class="form form-control"
          id="productActive"
          v-model="productActive"
          placeholder="Enter product active"
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  </div>
</template>

<script>
import { ProductsAPI } from "../api/BaseAPI";

export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: 0,
        image: "",
        carousel: false,
        subscription: false,
      },
      errors: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let component = this;
      let data = component.$route.params.pid;
      ProductsAPI.getProducts(data).then((response) => {
        component.product = response.data;
      });
    },
  },
};
</script>

<style>
</style>