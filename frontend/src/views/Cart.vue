<script>
import { mapActions, mapState } from 'pinia';
import { useCartStore } from '../stores/cart';

export default {
  data: () => ({
    isLoading: false,
    products: [],
    page: 1,
    productsPerPage: 6,
    totalProducts: 0,
  }),
  computed: {
    ...mapState(useCartStore, ['getItems', 'getTotalPrice']),
  },
  methods: {
    ...mapActions(useCartStore, ['addItem', 'deleteItem']),
  },
  mounted() {
    this.isLoading = true;
    fetch('https://sklep-api.cierzniak.it/products')
      .then((response) => response.json())
      .then((body) => {
        this.products = body.data;
        this.page = body.metadata.page;
        this.productsPerPage = body.metadata.itemsPerPage;
        this.totalProducts = body.metadata.totalRecords;
        this.isLoading = false;
      });
  }
};
</script>

<template>
  <h2 class="border-bottom border-3 border-dark">Koszyk</h2>
  <div class="container-fluid">
    <div class="row">
      <div class="cartitem col-md-12 d-flex" v-for='item in getItems' :key='`cart-${item.product.id}`'>
        <img class="photo" :src="item.product.photoUrl" width="150" height="150">
        <span class="name">{{ item.product.name }}  </span>
        <span class="quantity rounded-pill p-2">{{ item.quantity }}</span>
        <button type='button' @click='deleteItem(item.product.id)'>Usuń z koszyka</button>
      </div>
    </div>
  </div>
  <div class="all">
    <strong>razem:</strong> {{ getTotalPrice }} PLN
  </div>
</template>

<style scoped>
.cartitem {
  height: 20vh;
  margin-top: 40px;
  background-color: gray;
  border: 3px solid rgba(75, 0, 130, 1);
  padding: 20px;
  border-radius: 20px;
  transition: 0.1s ease-out
}
.cartitem:hover {
  box-shadow: 0 0 10px 5px rgba(75, 0, 130, 1);
}
.photo {
  border: 2px solid rgba(75, 0, 130, 1);
  border-radius: 30px;
}
button {
  align-self: center;
  margin: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid rgba(75, 0, 130, 1);
  border-radius: 400px;
  transition: 0.1s ease-out
}
button:hover {
  color: white;
  background-color: rgba(75, 0, 130, 1) ;
  box-shadow: 0 0 10px 5px rgba(75, 0, 130, 1);
}
.name {
  align-self: center;
}
.quantity {
  margin-left: 20px;
  align-self: center;
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid rgba(75, 0, 130, 1);
  transition: 0.1s ease-out
}
.name {
  margin: 10px;
  font-weight: bold;
}
h2 {
  text-align: center;
  margin-top: 30px;
  padding-bottom: 40px;
}
.all {
  font-size: 32px;
  margin-top: 40px;
  text-align: center;
}
</style>