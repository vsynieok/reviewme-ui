<template>
  <span class="review-form__stars" :class="{ 'invalid-field': invalid }">
    <span class="review-form__lbl">Оцінка</span>
    <span
      v-for="n in [1, 2, 3, 4, 5]"
      :key="n"
      class="star"
      :class="{ 'star--filled': n <= rating }"
    >
      <input
        type="radio"
        :id="String(n)"
        :value="n"
        v-model="rating"
        :disabled="disabled"
      />
      <label :for="String(n)">★</label>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  invalid: boolean;
  disabled: boolean;
}>();

// enable use of v-model
const rating = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.review-form__stars {
  box-sizing: border-box;
  display: block;

  height: 33px;
  padding-inline: 10px;
  margin-bottom: 10px;

  border: 1px var(--theme-color-light-gray) solid;
  transition: border 0.2s ease-in;

  font-size: 15px;
  user-select: none;
  color: var(--theme-color-light-gray);

  text-align: left;
}

.review-form__stars .review-form__lbl {
  padding-right: 10px;
}

.review-form__stars input {
  appearance: none;
  display: none;
}

.star label,
.star:hover input:disabled + label {
  cursor: default;
  -webkit-text-stroke: 1px var(--theme-color-light-gray);
  font-size: 20px;
  color: var(--theme-color-light-gray);
  user-select: none;
  margin-inline: 1px;

  transition: all 0.1s ease-in;
}

.star:hover label {
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.star--filled label,
.star--filled:hover input:disabled + label {
  -webkit-text-stroke: 1px var(--theme-color-black);
  color: var(--theme-color-black);
}
</style>
