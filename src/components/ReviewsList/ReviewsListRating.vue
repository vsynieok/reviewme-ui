<template>
  <span
    v-for="n in [1, 2, 3, 4, 5]"
    class="star"
    :class="{ highlighted: n <= rating }"
    :key="n"
    >★</span
  >
</template>

<script setup lang="ts">
// eslint-disable-next-line
const props = defineProps<{ rating: number }>();
</script>

<style scoped>
.star {
  color: var(--theme-color-light-gray);
  -webkit-text-stroke: 1px var(--theme-color-light-gray);
}

.highlighted {
  color: var(--theme-color-black);
  -webkit-text-stroke: 1px var(--theme-color-black);
}
</style>
