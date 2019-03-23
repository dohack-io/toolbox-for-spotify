import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";

import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
  ],
});

// Process spotify redirect
router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/auth")) {
    const { code } = to.query;

    if (code !== undefined) {
      store.dispatch("auth/authenticate", code);
    }

    next("/");
    return;
  }

  next();
});

// Check for pages that require authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true && !store.getters["auth/isAuthenticated"]) {
    next("/");
  } else {
    next();
  }
});

export default router;
