<template>
  <div class="reviews-list__container">
    <div class="reviews-list__card" v-for="review in reviews" :key="review.id">
      <p>{{ review.name }}</p>
      <p>{{ review.comment }}</p>
      <p>{{ new Date(review.lastModified ?? "").toLocaleDateString() }}</p>
      <p>{{ review.rating }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Review from "@/api/models/Review";
import { getByPage } from "@/api/reviews";
import { onMounted, ref } from "vue";

const reviews = ref<Review[]>([]);

onMounted(async () => {
  reviews.value = (await getByPage(1, 5))?.items ?? [];
});

const addReview = (review: Review) => {
  reviews.value = [review, ...reviews.value];
};

defineExpose({ addReview });
</script>

<style scoped>
.reviews-list__container {
  display: flex;
}
</style>
