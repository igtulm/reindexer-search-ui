import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/pages/MainPage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';
import webroutes from './webroutes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.assetsPublicPath,
  routes: [
    {
      path: webroutes.mainPage,
      name: 'MainPage',
      component: MainPage,
      props: route => ({ query: route.query.query }),
    },
    {
      path: webroutes.searchPage,
      name: 'SearchPage',
      component: SearchPage,
      props: route => ({ query: route.query.query }),
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
  ],
});
