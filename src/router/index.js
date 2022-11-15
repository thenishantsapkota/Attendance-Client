import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useUserStore } from "../stores/user.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue")
    },
    {
      path: "/me",
      name: "profile",
      component: () => import("../views/ProfileView.vue")
    }
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useUserStore();
  const access_token = localStorage.getItem("access_token");

  if (authRequired && !auth.access_token && !access_token) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
