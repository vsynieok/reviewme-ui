<template>
  <div class="review-form">
    <form :class="{ hidden: isSubmitted }" @submit.prevent="submitReview">
      <div class="review-form__header">
        <input
          :class="{ 'invalid-field': isFieldInvalid('name') }"
          type="text"
          placeholder="Ваше ім'я"
          maxlength="30"
          v-model="name"
          :disabled="areFieldsDisabled"
        />
        <RatingInput
          v-model="rating"
          :disabled="areFieldsDisabled"
          :invalid="isFieldInvalid('rating')"
        />
      </div>
      <textarea
        :class="{ 'invalid-field': isFieldInvalid('comment') }"
        placeholder="Коментар"
        maxlength="255"
        v-model="comment"
        :disabled="areFieldsDisabled"
      ></textarea>
      <button v-if="isLoading" type="submit" :disabled="isLoading">
        <img src="/icons/loading.svg" />
      </button>
      <button v-else type="submit" :disabled="areFieldsDisabled">
        Залишити відгук
      </button>
    </form>
    <ReviewSubmitted
      :type="isSubmitFailed ? 'error' : 'success'"
      v-if="isSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { add } from "@/api/reviews";
import RatingInput from "./RatingInput.vue";
import ReviewSubmitted from "./ReviewSubmitted.vue";
import Review from "@/api/models/Review";

const rating = ref(0);
const name = ref("");
const comment = ref("");
const errors = ref<string[]>([]);
const isLoading = ref(false);
const isSubmitted = ref(false);
const isSubmitFailed = ref(false);

const emit = defineEmits({
  onReviewSent(review: Review) {
    return review;
  },
});

const isFieldInvalid = (f: string) => {
  return errors.value.includes(f);
};

const areFieldsValidated = () => {
  let localErrors: string[] = [];

  if (name.value.length === 0) localErrors.push("name");
  if (comment.value.length === 0) localErrors.push("comment");
  if (rating.value === 0) localErrors.push("rating");

  if (localErrors.length > 0) {
    errors.value = localErrors;
    setTimeout(() => (errors.value = []), 3000);
    return false;
  }

  errors.value = [];
  return true;
};

const areFieldsDisabled = computed(() => {
  return isLoading.value || isSubmitted.value;
});

const submitReview = async () => {
  if (isLoading.value) return;
  if (!areFieldsValidated()) return;

  isLoading.value = true;
  try {
    const newReview = await add({
      name: name.value,
      comment: comment.value,
      rating: rating.value,
    });
    if (!newReview) throw new Error();

    emit("onReviewSent", newReview);
  } catch {
    isSubmitFailed.value = true;
  } finally {
    isSubmitted.value = true;
    isLoading.value = false;
  }
};
</script>

<style scoped>
.review-form {
  box-sizing: border-box;
  position: relative;
  width: clamp(300px, 70%, 600px);
  height: max-content;
  margin: auto;

  background-color: white;

  box-shadow: 10px 10px var(--theme-color-black);
  border: 2px var(--theme-color-black) solid;
  z-index: 3;
}

.review-form__header {
  display: flex;
  justify-content: space-between;
}

form {
  height: 100%;
  padding: 25px;
  justify-content: space-between;
}

form button[type="submit"],
form button[type="submit"]:disabled:hover {
  box-sizing: border-box;
  cursor: default;
  width: 100%;
  padding: 5px 10px;

  background-color: var(--theme-color-light-gray);
  border: 1px var(--theme-color-light-gray) solid;

  font: inherit;
  font-size: 15px;
  color: white;

  transition: all 0.1s ease-in;
}

form button[type="submit"]:focus {
  outline: none;
}

form button[type="submit"]:hover {
  cursor: pointer;
  background-color: white;
  color: var(--theme-color-black);
  border: 1px var(--theme-color-black) solid;
  transition: all 0.05s ease-in;
}

form button[type="submit"] img {
  filter: invert();
  height: 15px;
}

.hidden {
  opacity: 0;
}

input {
  display: inline;
  width: 100%;
  box-sizing: border-box;

  padding: 5px 10px;
  margin-bottom: 10px;
  margin-right: 10px;

  font: inherit;
  font-size: 15px;

  border: 1px var(--theme-color-light-gray) solid;
  transition: border 0.2s ease-in;
  color: var(--theme-color-black);
}

textarea {
  display: block;
  box-sizing: border-box;
  resize: none;

  padding: 5px 10px;
  margin-bottom: 10px;

  height: 100px !important;
  width: 100% !important;

  font: inherit;
  font-size: 15px;

  border: 1px var(--theme-color-light-gray) solid;
  transition: border 0.2s ease-in;

  color: var(--theme-color-black);
}

input::placeholder,
textarea::placeholder {
  color: var(--theme-color-light-gray);
}

input:focus,
textarea:focus {
  outline: none;
  border: 1px var(--theme-color-black) solid;
}

.invalid-field {
  border: 1px red solid !important;
  transition: all 0.1s ease-in;
}

@media screen and (max-width: 600px) {
  .review-form__header {
    flex-direction: column;
  }
}
</style>
