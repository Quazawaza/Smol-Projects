<script>
export default {
  props: {
    current: { type: Number, required: true },
    total: { type: Number, required: true },
    delta: { type: Number, default: 2 },
    event: { type: Function, default: () => {} },
  },
  computed: {
    pages() {
      return this.pagination(this.current, this.total, this.delta);
    },
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
    internalEvent(e) {
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
  <div class="pagination">
    <button
        v-for="page in pages"
        :key="`page-${page}`"
        :class="{ active: page === current, disabled: page === '...' }"
        @click="internalEvent"
    >
      {{ page }}
    </button>
  </div>
  <div style="clear: both;"/>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-flow: row wrap;
  margin: 15px;
  float: right;
  gap: 5px;
}

.pagination button {
  color: #f8f9fa;
  background-color: #adb5bd;
  min-width: 20px;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #adb5bd;
  cursor: pointer;
}

.pagination button.active {
  background-color: #20c997;
  color: white;
  border: 1px solid #20c997;
}

.pagination button.disabled {
  cursor: default;
}

.pagination button:hover:not(.active):not(.disabled) {
  color: #adb5bd;
  background-color: #f8f9fa;
}
</style>
