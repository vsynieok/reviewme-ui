import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import Reviews from "@/views/Reviews/Reviews.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: App,
    },
    {
      path: "/reviews",
      component: Reviews,
    },
  ],
});

export default router;
