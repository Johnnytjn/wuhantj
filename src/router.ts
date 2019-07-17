import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './views/main/Index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/main/:type',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MainPage
    },
    {
      path: '*',
      name: 'home',
      component: MainPage
    }
  ]
});
