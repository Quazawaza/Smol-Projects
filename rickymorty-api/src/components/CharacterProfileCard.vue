<script>
export default {
  // v props służy do wskazania danych, które mają zostać przekazane z zewnątrz
  props: {
    // v to jest nazwa propsa
    //               v to jest tego typ, może być Object, Array, String, Number, Boolean i inne typy proste
    //                             v required wskazuje, że ten props jest wymagany
    characterData: { type: Object, required: true },
  },
  computed: {
    wrapperCss() { // < niniejsza metoda służy do dodania odpowiednich klas CSS w określonych przypadkach
      const classes = ['cardWrapper'];
      switch (this.characterData.status) {
        case 'Alive':
          classes.push('cardWrapper__alive');
          break;
        case 'Dead':
          classes.push('cardWrapper__dead');
          break;
      }
      switch (this.characterData.gender) {
        case 'Female':
          classes.push('cardWrapper__female');
          break;
        case 'Male':
          classes.push('cardWrapper__male');
          break;
      }
      return classes.join(' ');
    },
    gender() {
      switch (this.characterData.gender) {
        case 'Female':
          return '♀️';
        case 'Male':
          return '♂️';
        case 'Genderless':
          return '⚧️';
        default:
          return '✨';
      }
    }
  },
};
</script>

<template>
  <RouterLink :to="{ name: 'profile', params: { id: characterData.id } }" :class="wrapperCss">
    <img
        class="avatar"
        :src="characterData.image"
        :alt="`Zdjęcie ${characterData.name}`"
    />
    <div class="info">
      <h2>{{ characterData.name }}</h2>
    </div>
  </RouterLink>
</template>

<style scoped>
.cardWrapper {
  background-color: #adb5bd;
  border: 6px solid #6c757d;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  padding: 0 5px;
  cursor: pointer;
  text-decoration: none;
}

.cardWrapper:hover {
  background-color: #6c757d;
}

.cardWrapper__alive {
  background-color: #20c997;
  border-color: #1aa179;
}

.cardWrapper__alive:hover {
  background-color: #1aa179;
}

.cardWrapper__dead {
  background-color: #dc3545;
  border-color: #b02a37;
}

.cardWrapper__dead:hover {
  background-color: #b02a37;
}

.avatar {
  width: 60px;
  height: 60px;
  border: 6px solid #6c757d;
  margin: 1px;
}

.cardWrapper__female .avatar {
  border-color: #d63384;
}

.cardWrapper__male .avatar {
  border-color: #0d6efd;
}

.info > h2 {
  margin: 0;
  color: #f8f9fa;
}

.cardWrapper__alive > .info > h2 {
  color: #842029;
}

.cardWrapper__dead > .info > h2 {
  color: #ffc107;
}
</style>
