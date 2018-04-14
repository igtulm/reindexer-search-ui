import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/pages/MainPage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.assetsPublicPath,
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
  ],
});
