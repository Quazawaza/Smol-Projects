<script>
import { mapActions, mapState } from 'pinia';
import { useCartStore } from '../stores/cart';
import Pagination from '../components/Pagination.vue';

export default {
  components: { Pagination },
  data: () => ({
    isLoading: false,
    products: [],
    page: 1,
    totalProducts: 0,
    Productssperpage: 1,
  }),
  computed: {
    ...mapState(useCartStore, ['getItems', 'getTotalPrice']),
    totalPages() {
      console.log('liczba stron',  Math.ceil( this.totalProducts / this.Productssperpage), this.totalProducts, this.Productssperpage)
      return Math.ceil( this.totalProducts / this.Productssperpage);
    },
  },
  methods: {
    ...mapActions(useCartStore, ['addItem', 'deleteItem']),
    getproducts() {
      fetch(`https://sklep-api.cierzniak.it/products?page=${this.page}`)
      .then((response) => response.json())
      .then((body) => {
        this.products = body.data;
        this.totalProducts = body.metadata.totalRecords;
        this.Productssperpage = body.metadata.itemsPerPage;
        
      });
    },
  NextPage() {
    this.getproducts();
  }
  },
  mounted() {
    this.getproducts(); 
  }
};
</script>

<template>
  <div class="container-fluid ">
    <div class="row d-flex justify-content-center ">
      <div class="col-md-3 d-flex flex-column product_div "  v-for='product in products' :key='product.id'>
          <img class="photo" :src="product.photoUrl" >
          
          <h5 class="Product_Name">{{ product.name }} </h5>
          
          <span class="description"> {{ product.description }} </span>

          <span class="price"> {{ product.price.amount / 100 }} {{ product.price.currency }} </span>
          <button type='button' class="AddToCart" @click='addItem(product, "inc")'>Dodaj do koszyka</button>
      </div>
      
    </div>
    <Pagination v-model:current="page" :delta="6" :total="totalPages" :event="NextPage" />
  </div>
</template>

<style scoped>
.product_div {
  margin-right: 20px;
  backdrop-filter: blur(7px);
  background-color: rgba(166, 166, 166, 0.6);
  padding: 15px;
  border: 3px solid rgba(75, 0, 130, 1);
  border-radius: 30px;
  margin-top: 5vh;
  transition: 0.1s ease-out
}
.product_div:hover {
  box-shadow: 0 0 10px 5px rgba(75, 0, 130, 1);
}
.photo {
  border: 2px solid rgba(75, 0, 130, 1);
  border-radius: 30px;
}
.Product_Name {
  text-align: center;
  font-weight: bold;
  margin: 10px;
  padding: 10px;
}
.description {
  font-weight: lighter;
  color: lightgray;
  font-size: 13px;
  text-align: center;
}
.price {
  font-weight: bold;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
}
.AddToCart {
  align-self: center;
  margin: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid rgba(75, 0, 130, 1);
  border-radius: 400px;
  transition: 0.1s ease-out
}
.AddToCart:hover {
  color: white;
  background-color: rgba(75, 0, 130, 1) ;
  box-shadow: 0 0 10px 5px rgba(75, 0, 130, 1);
}

</style>