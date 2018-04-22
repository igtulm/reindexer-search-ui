import Vue from 'vue';
import humps from 'humps';
import Router from 'vue-router';
import MainPage from '@/pages/MainPage';
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
      props: route => {
        const params = humps.camelizeKeys(route.query);

        return {
          ...params,
          limit: parseInt(params.limit, 10) || 10,
          offset: parseInt(params.offset, 10) || 0,
          sortDesc: parseInt(params.sortDesc, 10) || 0,
        };
      },
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
  ],
});
