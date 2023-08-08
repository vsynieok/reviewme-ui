<template>
  <div class="message-box">
    <div class="message-box__icon">{{ type === "success" ? "🙌" : "😖" }}</div>
    {{ type === "success" ? "Дякуємо за Ваш час!" : "Щось пішло не так..." }}
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line
const props = defineProps<{ type: "error" | "success" }>();
</script>

<style scoped>
.message-box {
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  font-weight: bold;
  font-size: 20px;

  animation: appear 0.5s ease-out;
}

.message-box__icon {
  font-size: 70px;
  margin-bottom: 20px;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translate(0, -15px);
  }
  100% {
    opacity: 1;
  }
}
</style>
