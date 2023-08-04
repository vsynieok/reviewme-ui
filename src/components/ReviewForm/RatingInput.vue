<template>
  <span class="review-form__stars" :class="{ 'invalid-field': invalid }">
    <span class="review-form__lbl">Оцінка</span>
    <span
      v-for="n in [1, 2, 3, 4, 5]"
      :key="n"
      :class="`star${isStarFilled(n) ? ' star--filled' : ''}`"
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

const rating = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
const emit = defineEmits(["update:modelValue"]);

const isStarFilled = (n: number) => {
  return n <= props.modelValue;
};
</script>

<style scoped>
.review-form__stars {
  display: block;
  height: 33px;
  box-sizing: border-box;
  border: 1px #a5b0bb solid;
  transition: border 0.2s ease-in;
  padding-inline: 10px;
  font-size: 15px;
  user-select: none;
  color: #a5b0bb;
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
  -webkit-text-stroke: 1px #a5b0bb;
  font-size: 20px;
  color: #a5b0bb;
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
  -webkit-text-stroke: 1px #2c3e50;
  color: #2c3e50;
}
</style>
