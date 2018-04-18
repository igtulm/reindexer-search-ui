import { ADD_TOAST_MESSAGE } from 'vuex-toast';
import Api from '@/api';
import routes from '@/api/routes';
import ResultPresenter from '@/presenters/ResultPresenter';
import types from './mutation-types';

export const getEntities = (context, params) => {
  const { commit, dispatch } = context;
  const { entity, isGreedy, queryParams } = params;

  let route;
  switch (entity) {
    case 'Posts':
      route = routes.searchPosts;
      break;
    case 'Comments':
      route = routes.searchComments;
      break;
    default:
      return;
  }

  commit(types.GET_ENTITIES.REQUEST);

  Api.get(route, queryParams)
    .then(
      response => {
        const { data } = response;
        const payload = {
          items: ResultPresenter.items(data),
          total: ResultPresenter.total(data),
          isGreedy,
        };

        commit(types.GET_ENTITIES.SUCCESS, payload);
      },
      error => {
        commit(types.GET_ENTITIES.FAIL, error);

        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: error, type: 'danger' },
          { root: true },
        );
      },
    )
    .catch(error => {
      commit(types.GET_ENTITIES.FAIL, error);

      return dispatch(
        ADD_TOAST_MESSAGE,
        { text: error, type: 'danger' },
        { root: true },
      );
    });
};
