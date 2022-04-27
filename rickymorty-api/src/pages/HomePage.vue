<script>
import Loader from "../components/Loader.vue";
import SearchBar from "../components/SearchBar.vue";
import Error from "../components/Error.vue";
import CharactersList from "../components/CharactersList.vue";
import Pagination from "../components/Pagination.vue";

export default {
  // v to jest lista wykorzystywanych komponentów
  components: { Loader, SearchBar, Error, CharactersList, Pagination },
  data: function () { // < to są wewnętrzne dane komponentu
    return {
      isLoading: false, // < informacja czy dane są ładowane
      error: null,
      characters: [], // < lista postaci
      info: {
        total: 0, // < sumaryczna ilość postaci
        pages: 1, // < sumaryczna ilość stron
        currentPage: Number(this.$route.params.page ||  1), // < obecna strona
      },
      search: { // < dane z wyszukiwarki (two-way data binding)
        name: '',
        status: '',
        gender: '',
      },
    };
  },
  methods: { // < tutaj będziemy wrzucać wszystkie funkcje
    fetchCharacters() {
      fetch('https://rickandmortyapi.com/api/character?'
            + `name=${this.search.name}&`
            + `status=${this.search.status}&`
            + `gender=${this.search.gender}&`
            + `page=${this.info.currentPage}`)
          .then((response) => response.json()) // < tutaj wyciągamy dane w postaci JSONa z danych requestu HTTP
          .then((data) => { // < tutaj już mamy JSONa i możemy go przetwarzać
            if (data.error) {
              this.error = data.error;
              this.characters = [];
              this.info.total = 0;
              this.info.pages = 1;
            } else {
              this.error = null;
              this.characters = data.results; // < zapisujemy w zmiennej characters informacje o postaciach
              this.info.total = data.info.count;
              this.info.pages = data.info.pages;
            }
            this.isLoading = false;
          });
    },
    runSearch() {
      this.info.currentPage = 1;
      this.fetchCharacters();
      this.$router.push({ name: 'home', params: { page: this.info.currentPage } });
    },
    runPagination() {
      this.fetchCharacters();
      this.$router.push({ name: 'home', params: { page: this.info.currentPage } });
    },
  },
  created() { // < ta funkcja zostanie uruchomiona, gdy komponent zostanie utworzony
    this.isLoading = true;
    this.fetchCharacters();
  },
};
</script>

<template>
  <Loader v-if="isLoading"/>
  <template v-else>
    <SearchBar
        v-model:name="search.name"
        v-model:status="search.status"
        v-model:gender="search.gender"
        :event="runSearch"
    />
    <Error v-if="error" :message="error" />
    <template v-else>
      <CharactersList :charactersData="characters"/>
      <Pagination v-model:current="info.currentPage" :total="info.pages" :event="runPagination" />
    </template>
  </template>
</template>
