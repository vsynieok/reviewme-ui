import { createRouter, createWebHistory } from "vue-router";
import Reviews from "@/views/Reviews.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Залиште відгук!",
    },
    {
      path: "/reviews",
      component: Reviews,
      name: "Всі відгуки",
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `ReviewMe | ${to.name as string}`;
  next();
});

export default router;
