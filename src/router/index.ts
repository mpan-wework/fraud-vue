import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Baidu from '../views/Baidu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/www.baidu.com',
    exact: true,
    component: Baidu,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
