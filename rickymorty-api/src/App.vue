<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";

export default {
  components: { RouterLink, RouterView, Header },
};
</script>

<template>
  <Header />
  <header>
      <nav>
        <RouterLink to="/">Strona główna</RouterLink>
        <RouterLink to="/about">O projekcie</RouterLink>
      </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: navy;
}

header > nav {
  text-align: center;
}

header > nav > a {
  color: #f8f9fa;
  font-size: 32px;
  text-decoration: none;
  padding-right: 10px;
}

header > nav > a:last-child {
  padding-right: 0;
}

header > nav > a:hover {
  color: #adb5bd;
}

main {
  margin: 0 20px;
  color: #f8f9fa;
}
</style>
