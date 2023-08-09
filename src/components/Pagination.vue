<template>
  <div class="pagination">
    <div
      :class="{
        page: n !== '...',
        ellipsis: n === '...',
        current: String(page) === n,
      }"
      v-for="n in pageKeys"
      :key="n"
      @click="n !== '...' ? handlePageChange(parseInt(n)) : undefined"
    >
      {{ n }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ totalPages: number }>();
const emit = defineEmits({
  pageChanged(p: number) {
    return p;
  },
});

const pageKeys = computed(() => {
  let keys = [...Array(props.totalPages).keys()].map((n) => n + 1);
  if (keys.length <= 5) return keys.map((k) => String(k));

  let first = keys[0];
  let last = keys[keys.length - 1];
  let middle = keys.filter((v) => isPageInRange(v, first, last));

  let result = [String(first)];
  if (middle[0] !== first + 1) result.push("...");
  result = [...result, ...middle.map((v) => String(v))];
  if (middle[middle.length - 1] !== last - 1) result.push("...");
  result.push(String(last));

  return result;
});

const page = ref(1);

const handlePageChange = (p: number) => {
  emit("pageChanged", p);
  page.value = p;
};

const isPageInRange = (v: number, firstPageN: number, lastPageN: number) => {
  // this checks whether the given number
  // is in necessary range from selected page number
  // so the pagination would be
  // displayed correctly

  if (v === firstPageN || v === lastPageN) return false;
  if (page.value >= firstPageN && page.value <= firstPageN + 2)
    return v <= firstPageN + 3;
  if (page.value >= lastPageN - 2 && page.value <= lastPageN)
    return v > lastPageN - 4;
  return v > page.value - 2 && v < page.value + 2;
};
</script>

<style scoped>
.pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 35px;
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 50px;
  width: min-content;
  gap: 20px;
}

.page {
  padding: 10px;
  background-color: var(--theme-color-light-gray);
  color: white;
}

.page:hover:not(.current) {
  cursor: pointer;
  color: var(--theme-color-black);
}

.current {
  background-color: var(--theme-color-black);
}

.current:hover {
  cursor: default;
}

.ellipsis {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

@media screen and (max-width: 820px) {
  .pagination {
    margin-top: 30px;
  }
}
</style>
