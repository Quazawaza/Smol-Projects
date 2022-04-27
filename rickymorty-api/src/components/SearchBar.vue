<script>
export default {
  props: {
    name: { type: String },
    status: {
      type: String,
      // v weryfikacja czy propsy mają poprawną wartość, trochę sztuka dla sztuki, gdy to są selectboxy
      validator(value) {
        return ['', 'alive', 'dead', 'unknown'].includes(value);
      },
    },
    gender: {
      type: String,
      validator(value) {
        return ['', 'female', 'male', 'genderless', 'unknown'].includes(value);
      },
    },
    event: { type: Function, default: () => {} },
  },
  // v ten komponent emituje te 3 eventy do komponentu nadrzędnego,
  //   przechwytujemy je poprzez v-model:{mojProps}="mojaData"
  emits: ['update:name', 'update:status', 'update:gender'],
};
</script>

<template>
  <section class="searchWrapper">
    <input
        class="searchInput"
        v-model="name"
        type="text"
        placeholder="Imię postaci"
        @keyup="$emit('update:name', name);"
        @keydown.enter="$emit('update:name', name); event();"
    />
    <select class="searchSelect" v-model="status" @change="$emit('update:status', status);">
      <option value="">Wszyscy</option>
      <option value="alive">Żywy</option>
      <option value="dead">Martwy</option>
      <option value="unknown">Nieznany</option>
    </select>
    <select class="searchSelect" v-model="gender" @change="$emit('update:gender', gender);">
      <option value="">Wszyscy</option>
      <option value="female">Kobieta</option>
      <option value="male">Mężczyzna</option>
      <option value="genderless">Bezpłciowy</option>
      <option value="unknown">Nieznany</option>
    </select>
    <button class="searchButton" type="button" @click="event">Wyszukaj</button>
  </section>
</template>

<style scoped>
.searchWrapper {
  margin: 10px 30px;
}

.searchInput, .searchSelect, .searchButton {
  font-size: 18px;
  padding: 8px;
  margin-right: 15px;
}

.searchButton {
  background-color: #0dca;
  color: #f8f9fa;
  font-weight: 900;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color ease 0.3s;
}

.searchButton:hover {
  background-color: #0aa2c0;
}
</style>
