import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      isPrivate: true,
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage[process.env.VUE_APP_TOKEN_NAME] && true;

  const { isPrivate } = to.meta;

  if (isPrivate && !isAuthenticated) {
    next('/login');
  } else if (!isPrivate && isAuthenticated) {
    next('/');
  }

  next();
});

export default router;
