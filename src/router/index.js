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
        const { query, searchType, sortBy } = params;

        // TODO refactoring
        const newParams = {
          query,
          searchType,
          sortBy,
          limit: parseInt(params.limit, 10) || 10,
          offset: parseInt(params.offset, 10) || 0,
          sortDesc: parseInt(params.sortDesc, 10) || 0,
        };

        return {
          ...newParams,
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
