<template>
  <div class="reviews-list__card">
    <span class="name">{{ review.name }}</span>
    <span class="date">
      {{ new Date(review.lastModified ?? "").toLocaleDateString() }}
    </span>
    <p class="comment">{{ review.comment }}</p>

    <ReviewsListRating :rating="review.rating" />
  </div>
</template>

<script setup lang="ts">
import Review from "@/api/models/Review";
import ReviewsListRating from "./ReviewsListRating.vue";

const props = defineProps<{ review: Review }>();
</script>

<style scoped>
.reviews-list__card {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;

  background-color: white;
  border: 2px var(--theme-color-light-gray) solid;
  box-shadow: 10px 10px var(--theme-color-light-gray);

  scroll-snap-align: center;

  text-align: left;
  color: var(--theme-color-black);
}

.name {
  margin: 0;
  font-weight: bolder;
  font-size: 17px;
}

.comment {
  font-style: italic;
  font-size: 14px;
  margin: 10px 0 0 0;
  height: 100px;

  overflow: hidden;
  -webkit-box-orient: vertical;
}

.date {
  font-size: 15px;
  margin-left: 10px;
  opacity: 0.8;
}
</style>
