<template>
  <h1>Залиште відгук</h1>
  <h2>Нам дуже важлива Ваша думка 🤗</h2>
  <ReviewForm @on-review-sent="handleNewReview" />
  <ReviewsList ref="reviewsList" />
  <RouterLink class="more-reviews" to="/reviews">Всі відгуки ➔</RouterLink>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReviewForm from "./components/ReviewForm/ReviewForm.vue";
import ReviewsList from "./components/ReviewsList/ReviewsList.vue";
import Review from "./api/models/Review";

const reviewsList = ref<InstanceType<typeof ReviewsList>>();

const handleNewReview = (review: Review) => {
  reviewsList.value?.addReview(review);
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Victor+Mono&display=swap");

::selection {
  color: white;
  background: var(--theme-color-black);
}

body {
  --theme-color-black: #2c3e50;
  --theme-color-gray: #7a8794;
  --theme-color-light-gray: #a5b0bb;
  --theme-color-background: #e1e8ee;
  background-color: var(--theme-color-background);
}

h1 {
  text-transform: uppercase;
  font-size: 60px;
  letter-spacing: 2px;

  margin-bottom: 0;
  margin-inline: 20px;
}

h2 {
  color: var(--theme-color-gray);
  font-weight: normal;
  margin-bottom: 40px;
  margin-inline: 20px;
}

#app {
  font-family: "Victor Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--theme-color-black);
  margin-top: 60px;
}

.more-reviews {
  display: block;
  text-align: left;

  position: absolute;
  width: min-content;
  right: 0;
  margin-right: 150px;
  margin-top: 30px;

  font-size: 40px;
  line-height: 45px;

  text-decoration: none;
  font-weight: 400;
  color: var(--theme-color-black);
}

.more-reviews:hover {
  text-decoration: underline;
}
</style>
