import { ADD_TOAST_MESSAGE } from 'vuex-toast';
import Api from '@/api';
import routes from '@/api/routes';
import ResultPresenter from '@/presenters/ResultPresenter';
import types from './mutation-types';

// TODO get entity factory

export const getPostsList = (context, params) => {
  const { commit, dispatch } = context;

  commit(types.GET_ENTITY_LIST.REQUEST);

  Api.get(routes.searchPosts, params)
    .then(
      response => {
        const { data } = response;
        const payload = {
          list: ResultPresenter.items(data),
          total: ResultPresenter.total(data),
        };

        commit(types.GET_ENTITY_LIST.SUCCESS, payload);
      },
      error => {
        commit(types.GET_ENTITY_LIST.FAIL, error);

        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: error, type: 'danger' },
          { root: true },
        );
      },
    )
    .catch(error => {
      commit(types.GET_ENTITY_LIST.FAIL, error);

      return dispatch(
        ADD_TOAST_MESSAGE,
        { text: error, type: 'danger' },
        { root: true },
      );
    });
};

export const getCommentsList = (context, params) => {
  const { commit, dispatch } = context;

  commit(types.GET_ENTITY_LIST.REQUEST);

  Api.get(routes.searchComments, params)
    .then(
      response => {
        const { data } = response;
        const payload = {
          list: ResultPresenter.items(data),
          total: ResultPresenter.total(data),
        };

        commit(types.GET_ENTITY_LIST.SUCCESS, payload);
      },
      error => {
        commit(types.GET_ENTITY_LIST.FAIL, error);

        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: error, type: 'danger' },
          { root: true },
        );
      },
    )
    .catch(error => {
      commit(types.GET_ENTITY_LIST.FAIL, error);

      return dispatch(
        ADD_TOAST_MESSAGE,
        { text: error, type: 'danger' },
        { root: true },
      );
    });
};
