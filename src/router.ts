import { createRouter, createWebHistory } from "vue-router";
import Reviews from "@/views/Reviews.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/reviews",
      component: Reviews,
    },
  ],
});

export default router;
