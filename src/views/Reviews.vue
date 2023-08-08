<template>
  <h1>Всі відгуки</h1>
  <div
    class="reviews-container"
    ref="container"
    :class="{ overflowing: isContainerOverflowing }"
  >
    <ReviewCard
      v-for="review in reviews?.items"
      :key="review.id"
      :review="review"
      class="clickable-card"
      @click="
        () => {
          detailedReview = review;
        }
      "
    />
  </div>
  <div v-if="isLoading" class="reviews-loading">
    <img src="/icons/loading.svg" />
  </div>
  <Pagination
    :total-pages="reviews?.totalPages ?? 1"
    @page-changed="(p) => handlePageChange(p)"
  />
  <ReviewModal
    @close="
      () => {
        detailedReview = undefined;
      }
    "
    v-if="detailedReview"
    :review="detailedReview"
  />
</template>

<script setup lang="ts">
import ReviewCard from "@/components/ReviewsList/ReviewCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import EntitySet from "@/api/models/EntitySet";
import Review from "@/api/models/Review";
import { getByPage } from "@/api/reviews";
import ReviewModal from "@/components/ReviewModal.vue";
import Pagination from "@/components/Pagination.vue";

const reviews = ref<EntitySet<Review>>();
const detailedReview = ref<Review>();
const container = ref<HTMLDivElement>();
const isLoading = ref(true);
const isContainerOverflowing = ref(false);

onMounted(async () => {
  await fetchData();
  isContainerOverflowing.value =
    (container.value?.scrollHeight as number) >
    (container.value?.offsetHeight as number);
});

const fetchData = async (page = 1) => {
  isLoading.value = true;
  try {
    reviews.value = await getByPage(page, 6);
  } catch {
    console.log("oopsie!");
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = async (p: number) => {
  await fetchData(p);
  container.value?.scroll({ behavior: "smooth", top: 0 });
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
.reviews-container {
  position: relative;
  width: 100%;
  height: 75vh;
  margin-top: 40px;

  display: grid;
  grid-template-columns: repeat(2, clamp(300px, 70%, 500px));
  grid-template-rows: min-content;
  gap: 30px;
  justify-content: center;

  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.clickable-card {
  scroll-snap-align: start;
}

.clickable-card:hover {
  cursor: pointer;
  background-color: var(--theme-color-highlight);
}

.reviews-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: var(--theme-color-background-opaque);

  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.overflowing {
  border-bottom: 2px solid var(--theme-color-light-gray);
}

@media screen and (max-width: 1120px) {
  .reviews-container {
    grid-template-columns: 100%;
    grid-template-rows: min-content;
    overflow-y: scroll;
    width: clamp(300px, 70%, 500px);
    height: calc(82vh - 110px);
    margin: auto;
    padding: 30px;
    padding-top: 0;
    margin-top: 30px;
    gap: 20px;
  }
}

@media screen and (max-width: 1280px) {
  .reviews-container {
    height: calc(82vh - 140px);
  }
}
</style>
