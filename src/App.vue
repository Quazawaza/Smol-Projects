<script>
import { RouterLink, RouterView } from "vue-router";
import Home from "./views/Home.vue";

import Logo from './assets/logo.svg';
import Minicartbutton from './components/minicartbutton.vue';

export default {
  components: { RouterLink, RouterView, Home, Minicartbutton },
  computed: {
    logoSrc() { return Logo; },
  },
};
</script>

<template>
  <header class="bg-dark p-3">
    <div class="container-fluid d-flex justify-content-between">
      <RouterLink to="/" class="navbar-brand MonitorShop">
        <img :src="logoSrc" alt="Monitor Shop Logo" />
        MonitorShop
      </RouterLink>
      <div class="d-flex align-items-center">
        <RouterLink to="/cart" class="btn btn-outline-dark">
        <minicartbutton>
          
        </minicartbutton>
        </RouterLink>
      </div>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
html,
body {
  background-color: rgb(20, 20, 20);
  color: white;
}
.MonitorShop {
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: white;
}
.MonitorShop:hover {
  color: white;
}
</style>