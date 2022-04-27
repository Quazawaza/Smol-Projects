<script>
import CharacterProfileCard from "./CharacterProfileCard.vue";

export default {
  components: { CharacterProfileCard },
  props: {
    charactersData: { type: Array, required: true },
  },
};
</script>

<template>
  <article class="listWrapper">
    <CharacterProfileCard
        v-for="char in charactersData"
        :key="`character-profile-${char.id}`"
        :characterData="char"
    />
  </article>
</template>

<style scoped>
.listWrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 10px;
}

@media screen and (min-width: 480px) and (max-width: 767px) {
  .listWrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .listWrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .listWrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
