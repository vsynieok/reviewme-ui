<template>
  <div class="reviews-list__container">
    <div class="reviews-list__fade"></div>
    <div class="reviews-list__loading" :class="{ hidden: !isLoading }"></div>
    <div v-if="!isLoading" class="reviews-list__grid" ref="container">
      <ReviewCard
        ref="cards"
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        @vue:mounted="scrollThroughCards()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Review from "@/api/models/Review";
import { getByPage } from "@/api/reviews";
import { computed, onMounted, onUnmounted, ref } from "vue";
import ReviewCard from "./ReviewCard.vue";
import config from "@/constants/config";

const reviewsArr = ref<Review[]>([]);
const cards = ref<InstanceType<typeof ReviewCard>[]>([]);
const container = ref<HTMLDivElement>();
const isLoading = ref(true);

// pushing additional reviews entries
// to create an infinite scroll loop effect
const reviews = computed({
  get: () => {
    let data = [...reviewsArr.value];
    data.sort(
      (b, a) =>
        new Date(a.lastModified as string).getTime() -
        new Date(b.lastModified as string).getTime()
    );
    data = [data.at(-1) as Review, ...data, ...data.slice(0, 2)];

    data.forEach((r, i) => {
      data[i] = {
        ...r,
        id: r.id + String(Math.floor(Math.random() * 100)),
      };
    });
    console.log(data);
    return data;
  },
  set: (value) => {
    reviewsArr.value = value;
  },
});

const _scrollingIntervalId = ref<number>(0);

onMounted(async () => {
  await fetchPreviewReviews();
});

onUnmounted(() => {
  clearInterval(_scrollingIntervalId.value);
});

const addReview = (review: Review) => {
  reviewsArr.value = [
    review,
    ...reviewsArr.value.slice(0, reviewsArr.value.length - 1),
  ];
  scrollThroughCards();
};

const fetchPreviewReviews = async () => {
  try {
    reviewsArr.value =
      (await getByPage(1, config.MAX_REVIEWS_ON_PREVIEW))?.items ?? [];
    isLoading.value = false;
  } catch {
    isLoading.value = true; // don't show anything
  }
};

const scrollThroughCards = (interval = 5) => {
  clearInterval(_scrollingIntervalId.value);

  scrollContainerToChild(cards.value[1].$el, "instant");

  var idx = 2;

  const intervalId = setInterval(() => {
    if (idx === cards.value.length - 1) idx = 1;
    scrollContainerToChild(
      cards.value[idx].$el,
      idx === 1 ? "instant" : "smooth"
    );
    idx++;
  }, interval * 1000);

  _scrollingIntervalId.value = intervalId;
};

const scrollContainerToChild = (
  el: HTMLDivElement,
  behavior: "smooth" | "instant"
) => {
  container.value?.scrollTo({
    left: el.offsetLeft - container.value.offsetWidth / 2 + el.offsetWidth / 2,
    behavior,
  });
};

defineExpose({ addReview });
</script>

<style scoped>
.reviews-list__container {
  width: 100%;
  --list-height: 210px;
}

.reviews-list__loading {
  position: absolute;
  left: 0;
  height: var(--list-height);
  width: 100%;
  background-color: var(--theme-color-background);
  z-index: 2;
}

.hidden {
  opacity: 0;
  animation: loading-finished 1.5s ease-in-out;
}

.reviews-list__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, clamp(300px, 70%, 600px));
  gap: 100px;

  overflow-x: hidden;
  padding-bottom: 10px;
  margin-bottom: -10px;
  scroll-snap-type: x mandatory;

  margin-top: 100px;
}

.reviews-list__fade {
  position: absolute;
  left: 0;
  background: linear-gradient(
    90deg,
    var(--theme-color-background) 0%,
    rgba(225, 232, 238, 0) 20%,
    rgba(225, 232, 238, 0) 80%,
    rgba(225, 232, 238, 1) 100%
  );
  width: 100%;
  height: var(--list-height);
  z-index: 1;
}

.overflown {
  background-color: red;
}

@keyframes loading-finished {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
