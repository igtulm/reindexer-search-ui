import Api from '@/api';
import routes, { routeConstructor } from '@/api/routes';
import paramsTransformer from '@/utils/paramsTransformer';
import resultGetter from '@/utils/resultGetter';
import types from './mutation-types';

export const reset = (context) => {
  const { commit } = context;

  commit(types.ITEMS_RESET);
};

export const getItemsList = (context, pload) => {
  const { commit, dispatch, state } = context;
  const { params } = state;
  const { db, namespace } = pload;

  commit(types.ITEMS_GET_LIST.REQUEST);

  Api.get(routeConstructor(routes.items, db, namespace), paramsTransformer(params))
    .then(
      (response) => {
        const { data } = response;
        const payload = {
          list: resultGetter.items(data),
          total: resultGetter.totalItems(data),
        };

        commit(types.ITEMS_GET_LIST.SUCCESS, payload);
      },
      (error) => {
        commit(types.ITEMS_GET_LIST.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.ITEMS_GET_LIST.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const setItemsParams = (context, params = {}) => {
  const { commit } = context;
  const payload = {
    params,
  };

  commit(types.ITEMS_PARAMS_SET, payload);
};

export const deleteItem = (context, pload) => {
  const { commit, dispatch } = context;
  const { db, namespace, item } = pload;

  commit(types.ITEMS_DELETE.REQUEST);

  Api.delete(routeConstructor(routes.items, db, namespace), item)
    .then(
      () => {
        commit(types.ITEMS_DELETE.SUCCESS);
        dispatch('settings/showSuccessMessage', 'Item is deleted', {
          root: true,
        });

        return dispatch('getItemsList', { db, namespace });
      },
      (error) => {
        commit(types.ITEMS_DELETE.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.ITEMS_DELETE.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const updateItem = (context, pload) => {
  const { commit, dispatch } = context;
  const { db, namespace, item } = pload;

  commit(types.ITEMS_UPDATE.REQUEST);

  Api.update(routeConstructor(routes.items, db, namespace), item)
    .then(
      () => {
        commit(types.ITEMS_UPDATE.SUCCESS);
        dispatch('settings/showSuccessMessage', 'Item is updated', { root: true });

        return dispatch('getItemsList', { db, namespace });
      },
      (error) => {
        commit(types.ITEMS_UPDATE.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.ITEMS_UPDATE.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const createItem = (context, pload) => {
  const { commit, dispatch } = context;
  const { db, namespace, item } = pload;

  commit(types.ITEMS_CREATE.REQUEST);

  Api.create(routeConstructor(routes.items, db, namespace), item)
    .then(
      () => {
        commit(types.ITEMS_CREATE.SUCCESS);
        dispatch('settings/showSuccessMessage', 'Item is created', { root: true });

        return dispatch('getItemsList', { db, namespace });
      },
      (error) => {
        commit(types.ITEMS_CREATE.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.ITEMS_CREATE.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const getItemsByQuery = (context, pload) => {
  const { commit, dispatch } = context;
  const { db, query } = pload;

  commit(types.ITEMS_GET_BY_QUERY.REQUEST);

  const params = {
    q: query,
  };

  Api.get(routeConstructor(routes.query, db), params)
    .then(
      (response) => {
        const { data } = response;
        const payload = {
          queryItems: resultGetter.items(data),
        };

        commit(types.ITEMS_GET_BY_QUERY.SUCCESS, payload);
      },
      (error) => {
        commit(types.ITEMS_GET_BY_QUERY.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.ITEMS_GET_BY_QUERY.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export default {
  reset,
  getItemsList,
  setItemsParams,
  deleteItem,
  updateItem,
  createItem,
  getItemsByQuery,
};
