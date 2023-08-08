<template>
  <h1>Залиште відгук</h1>
  <h2>Нам дуже важлива Ваша думка 🤗</h2>
  <ReviewForm @on-review-sent="handleNewReview" />
  <ReviewsList ref="reviewsList" />
  <RouterLink class="more-reviews" to="/reviews">Всі відгуки ➔</RouterLink>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReviewForm from "@/components/ReviewForm/ReviewForm.vue";
import ReviewsList from "@/components/ReviewsList/ReviewsList.vue";
import Review from "@/api/models/Review";

const reviewsList = ref<InstanceType<typeof ReviewsList>>();

const handleNewReview = (review: Review) => {
  reviewsList.value?.addReview(review);
};
</script>

<style scoped>
.more-reviews {
  display: block;
  text-align: left;

  position: absolute;
  right: 100px;
  margin-top: 50px;

  font-size: 40px;
  line-height: 45px;

  text-decoration: none;
  font-weight: 400;
  color: var(--theme-color-black);
}

.more-reviews:hover {
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .more-reviews {
    position: relative;

    display: block;
    background-color: var(--theme-color-black);

    width: max-content;
    left: 50%;
    transform: translate(-50%);
    padding: 4px 6px;
    margin-block: 50px;

    line-height: normal;
    text-align: center;
    font-size: 20px;
    color: white;
    text-decoration: underline;
  }
}
</style>
