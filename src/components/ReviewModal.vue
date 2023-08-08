<template>
  <div class="review-details-modal">
    <div class="modal-content">
      <header><span class="cross" @click="() => emit('close')">X</span></header>
      <section>
        <p class="name">{{ review.name }}</p>
        <p class="comment">
          {{ review.comment }}
        </p>
      </section>
      <footer>
        <span>{{
          new Date((review.lastModified as string) + "Z").toLocaleString()
        }}</span>
        <span class="stars"><ReviewsListRating :rating="review.rating" /></span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Review from "@/api/models/Review";
import ReviewsListRating from "./ReviewsList/ReviewsListRating.vue";

// eslint-disable-next-line
const props = defineProps<{ review: Review }>();
const emit = defineEmits({ close: () => true });
</script>

<style scoped>
.review-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  user-select: none;

  animation: modal-appears 0.1s linear;
  backdrop-filter: grayscale(100%);
}

.modal-content {
  position: absolute;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: clamp(200px, 80%, 700px);
  min-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  border: 2px var(--theme-color-black) solid;
  box-shadow: 10px 10px var(--theme-color-black);

  overscroll-behavior: contain;
}

.modal-content header {
  font-weight: bolder;
  text-align: right;
  padding: 10px 20px 0 0;
}

.modal-content header .cross:hover {
  color: var(--theme-color-gray);
  cursor: pointer;
}

.modal-content section {
  text-align: left;
  padding-inline: 50px;
  height: 100%;
  flex: 2;
}

.modal-content section .name {
  font-weight: bold;
  margin-top: 0;
}

.modal-content section .comment {
  font-style: italic;
  font-size: 14px;
  margin-bottom: 0;
}

.modal-content footer {
  padding: 20px 0 25px 50px;
  text-align: left;
  color: var(--theme-color-light-gray);
  font-size: 14px;
}

.modal-content footer .stars {
  margin-left: 15px;
  font-size: 17px;
  vertical-align: baseline;
}

@keyframes modal-appears {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 470px) {
  .modal-content footer .stars {
    display: block;
    margin-left: 0;
  }
}
</style>
