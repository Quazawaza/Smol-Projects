<script>
import warning from "../assets/warning.svg";

export default {
  props: {
    message: { type: String, required: true },
  },
  computed: {
    warningSrc() { return warning; },
  },
};
</script>

<template>
  <div class="errorWrapper">
    <img :src="warningSrc" alt="Uwaga" width="200" height="200" />
    <h2>Błąd</h2>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.errorWrapper {
  color: #ffc107;
  text-align: center;
}

.errorWrapper > h2 {
  font-size: 45px;
  margin: 0;
}

.errorWrapper > p {
  font-size: 22px;
  margin: 0;
}
</style>
