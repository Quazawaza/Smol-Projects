<script>
export default {
    props: {
    current: { type: Number, required: true },
    total: { type: Number, required: true },
    event: { type: Function, default: () => {} },
    delta: { type: Number, default: 2 },
    },
  computed: {
    pages() {
     
      return this.pagination(this.current, this.total, this.delta);
  
    }
  },
    methods: {
    pagination(current, total, delta) {
      return this.range(delta * 2 + 1, current - delta)
          .filter((page) => 0 < page && total >= page)
          .flatMap((page, index, { length }) => {
            if (0 === index) {
              return this.separate(1, page);
            }
            if (length - 1 === index) {
              return this.separate(page, total);
            }
            return [page];
          });
    },
    range(size, startAt) {
      return [...Array(size).keys()].map((i) => i + startAt);
    },
    separate(a, b) {
      return [a, ...({ 0: [], 1: [b], 2: [a + 1, b] }[b - a] || ['...', b])];
    },
    NextPage(e) {
      const page = Number(e.target.innerText);
      if (isNaN(page)) {
        return;
      }
      this.$emit('update:current', page);
      this.event();
    },
  },
};
</script>

<template>
<div class=" d-flex justify-content-center">
    <button
    v-for="page in pages"
    :key="`page-${page}`"
    type='button' 
    :class="{ active: page === current, disabled: page === '...'}"
    @click='NextPage'
    >
      {{ page }}
    </button> 
</div>
</template>

<style scoped>
button {
  align-self: center;
  width: 3rem;
  margin: 20px;
  padding: 10px;
  background-color: rgba(166, 166, 166, 0.6);
  border: 2px solid rgba(75, 0, 130, 1);
  border-radius: 400px;
  transition: 0.1s ease-out
}
button:hover, button.active {
  color: white;
  background-color: rgba(75, 0, 130, 1) ;
  box-shadow: 0 0 10px 5px rgba(75, 0, 130, 1);
}
button.disabled {
  cursor: default;
}
</style>