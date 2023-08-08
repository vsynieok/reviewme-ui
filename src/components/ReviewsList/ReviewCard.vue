<template>
  <div class="reviews-list__card" @click="(evt) => emit('click', evt)">
    <span class="name">{{ review.name }}</span>
    <span class="date">
      {{ new Date((review.lastModified as string) + "Z").toLocaleDateString() }}
    </span>
    <p v-if="isCommentOverflowing" class="overflowing-mask"></p>
    <p
      class="comment"
      ref="comment"
      :class="{ overflowing: isCommentOverflowing }"
    >
      {{ review.comment }}
    </p>

    <ReviewsListRating :rating="review.rating" />
  </div>
</template>

<script setup lang="ts">
import Review from "@/api/models/Review";
import ReviewsListRating from "./ReviewsListRating.vue";
import { computed, ref } from "vue";

const comment = ref<HTMLParagraphElement>();

const isCommentOverflowing = computed(
  () =>
    comment.value && comment.value?.scrollHeight > comment.value?.clientHeight
);

// eslint-disable-next-line
const props = defineProps<{ review: Review }>();
const emit = defineEmits({ click: (evt: MouseEvent) => evt });
</script>

<style scoped>
.reviews-list__card {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: min-content;

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
  height: 90px;

  overflow: hidden;
  -webkit-box-orient: vertical;
}

.date {
  font-size: 15px;
  margin-left: 10px;
  opacity: 0.8;
}

.overflowing {
  background: linear-gradient(
    var(--theme-color-black) 0%,
    var(--theme-color-black) 60%,
    white
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
