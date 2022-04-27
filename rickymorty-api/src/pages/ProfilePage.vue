<script>
import CharacterProfile from "../components/CharacterProfile.vue";
import Error from "../components/Error.vue";
import Loader from "../components/Loader.vue";

export default {
  components: { CharacterProfile, Error, Loader },
  data: function () {
    return {
      isLoading: false,
      error: null,
      character: null,
    };
  },
  methods: {
    fetchCharacterData() {
      fetch(`https://rickandmortyapi.com/api/character/${this.$route.params.id}`)
          .then((response) => response.json()) // < tutaj wyciągamy dane w postaci JSONa z danych requestu HTTP
          .then((data) => { // < tutaj już mamy JSONa i możemy go przetwarzać
            if (data.error) {
              this.error = data.error;
              this.character = null;
            } else {
              this.error = null;
              this.character = data;
            }
            this.isLoading = false;
          });
    },
  },
  created() {
    this.isLoading = true;
    this.fetchCharacterData();
  },
};
</script>

<template>
  <Loader v-if="isLoading" />
  <Error v-else-if="error" :message="error" />
  <CharacterProfile v-else :character="character" />
</template>
