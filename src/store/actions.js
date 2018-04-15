import { ADD_TOAST_MESSAGE } from 'vuex-toast';
import Api from '@/api';
import routes from '@/api/routes';
import resultGetter from '@/utils/resultGetter';
import types from './mutation-types';

export const getPostsByQuery = (context, pload) => {
  const { commit, dispatch } = context;
  const { query, limit = 10, offset = 0 } = pload;

  commit(types.POSTS_GET_BY_QUERY.REQUEST);

  const params = {
    query,
    limit,
    offset,
  };

  Api.get(routes.searchPosts, params)
    .then(
      response => {
        const { data } = response;
        const payload = {
          list: resultGetter.items(data),
          total: resultGetter.total(data),
        };

        commit(types.POSTS_GET_BY_QUERY.SUCCESS, payload);
      },
      error => {
        commit(types.POSTS_GET_BY_QUERY.FAIL, error);

        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: error, type: 'danger' },
          { root: true },
        );
      },
    )
    .catch(error => {
      commit(types.POSTS_GET_BY_QUERY.FAIL, error);

      return dispatch(
        ADD_TOAST_MESSAGE,
        { text: error, type: 'danger' },
        { root: true },
      );
    });
};

export const getCommentsByQuery = (context, pload) => {
  const { commit, dispatch } = context;
  const { query, limit = 10, offset = 0 } = pload;

  commit(types.COMMENTS_GET_BY_QUERY.REQUEST);

  const params = {
    query,
    limit,
    offset,
  };

  Api.get(routes.searchComments, params)
    .then(
      response => {
        const { data } = response;
        const payload = {
          list: resultGetter.items(data),
          total: resultGetter.total(data),
        };

        commit(types.COMMENTS_GET_BY_QUERY.SUCCESS, payload);
      },
      error => {
        commit(types.COMMENTS_GET_BY_QUERY.FAIL, error);

        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: error, type: 'danger' },
          { root: true },
        );
      },
    )
    .catch(error => {
      commit(types.COMMENTS_GET_BY_QUERY.FAIL, error);

      return dispatch(
        ADD_TOAST_MESSAGE,
        { text: error, type: 'danger' },
        { root: true },
      );
    });
};
