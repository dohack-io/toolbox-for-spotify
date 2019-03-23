import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Query from "./views/Query.vue";

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
      path: "/query",
      name: "query",
      component: Query,
      meta: { requiresAuth: true },
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

const authTokenRegExp: RegExp = /#access_token=(.*)&token_type.*/;

// Process spotify redirect
router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/auth")) {
    const match = to.hash.match(authTokenRegExp);

    if (match !== null) {
      store.dispatch("auth/authenticate", match[1]);
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
