<template>
  <h1>Залиште відгук</h1>
  <h2>Нам дуже важлива Ваша думка 🤗</h2>
  <ReviewForm @on-review-submitted="handleNewReview" />
  <ReviewsList ref="reviewsList" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReviewForm from "./components/ReviewForm/ReviewForm.vue";
import ReviewsList from "./components/ReviewsList.vue";
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
  background: #2c3e50;
}

body {
  background-color: #e1e8ee;
}

h1 {
  text-transform: uppercase;
  font-size: 60px;
  letter-spacing: 2px;

  margin-bottom: 0;
}

h2 {
  color: #7a8794;
  font-weight: normal;
  margin-bottom: 30px;
}

#app {
  font-family: "Victor Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
