<script>
export default {
  props: {
    character: { type: Object, required: true },
  },
  computed: {
    gender() {
      switch (this.character.gender) {
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
  <article class="profileWrapper">
    <h1>Profil {{ character.name }}</h1>
    <table class="profileTable">
      <thead>
      <tr>
        <th>Klucz</th>
        <th>Wartość</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>ID</td>
        <td>{{ character.id }}</td>
      </tr>
      <tr>
        <td>Zdjęcie</td>
        <td><img :src="character.image" :alt="`Zdjęcie ${character.name}`" width="60" height="60" /></td>
      </tr>
      <tr>
        <td>Imię i nazwisko</td>
        <td>{{ character.name }}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{ character.status }}</td>
      </tr>
      <tr>
        <td>Specyfika postaci</td>
        <td>{{ character.species }}</td>
      </tr>
      <tr>
        <td>Typ specyfikacji postaci</td>
        <td>{{ character.type }}</td>
      </tr>
      <tr>
        <td>Płeć</td>
        <td>{{ character.gender }}</td>
      </tr>
      <tr>
        <td>Pochodzenie</td>
        <td>{{ character.origin.name }}</td>
      </tr>
      <tr>
        <td>Ostatnie znane położenie</td>
        <td>{{ character.location.name }}</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<style scoped>
.profileWrapper {
  width: 80%;
  margin: 50px 10%;
  padding: 20px;
  background-color: #f8f9fa;
  color: #6c757d;
}
</style>
