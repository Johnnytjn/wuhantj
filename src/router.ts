import Vue from 'vue';
import Router from 'vue-router';
import DrugRelated from './views/drugRelated/Index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: DrugRelated
    },
    {
      path: '/drug-related',
      name: 'drug-related',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DrugRelated
    }
  ]
});
