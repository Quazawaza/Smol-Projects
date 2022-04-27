<script>
// przypisuje plik graficzny do zmiennej logo, żeby później móc to wykorzystać
import logo from "../assets/logo.svg";

export default {
  computed: {
    // v ze względu na fakt, że w <template> można wykorzystać tylko dane z options API,
    //   musimy zrobić taką prostą funkcję
    logoSrc() { return logo; },
  },
};
</script>

<template>
  <header class="header">
    <img :src="logoSrc" alt="Rick and Morty" class="logo" draggable="false" />
  </header>
</template>

<style scoped>
.header {
  height: 180px;
  text-align: center;
}

.logo {
  height: 140px;
  padding: 20px 0;
  user-select: none;
}
</style>
