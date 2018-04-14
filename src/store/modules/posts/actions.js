import Api from '@/api';
import routes, { routeConstructor } from '@/api/routes';
import resultGetter from '@/utils/resultGetter';
import types from './mutation-types';

export const getDbList = (context, params) => {
  const { commit, dispatch } = context;
  const newParams = {
    ...params,
    sortOrder: 'asc',
  };

  Api.get(routes.databases, newParams)
    .then(
      (response) => {
        const { data } = response;
        const list = resultGetter.items(data);
        const payload = {
          list,
        };

        commit(types.DB_GET_LIST.SUCCESS, payload);
      },
      (error) => {
        commit(types.DB_GET_LIST.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.DB_GET_LIST.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const createDb = (context, db) => {
  const { commit, dispatch } = context;

  commit(types.DB_CREATE.REQUEST);

  const json = {
    name: db,
  };

  Api.create(routes.databases, json)
    .then(
      () => {
        commit(types.DB_CREATE.SUCCESS);
        dispatch('settings/showSuccessMessage', 'Database is created', { root: true });

        return dispatch('getDbList');
      },
      (error) => {
        commit(types.DB_CREATE.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.DB_CREATE.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export const deleteDb = (context, db) => {
  const { commit, dispatch } = context;

  commit(types.DB_DELETE.REQUEST);

  Api.delete(routeConstructor(routes.database, db))
    .then(
      () => {
        commit(types.DB_DELETE.SUCCESS);
        dispatch('settings/showSuccessMessage', 'Database is deleted', {
          root: true,
        });

        return dispatch('getDbList');
      },
      (error) => {
        commit(types.DB_DELETE.FAIL, error);

        return dispatch('settings/throwError', error, { root: true });
      },
    )
    .catch((error) => {
      commit(types.DB_DELETE.FAIL, error);

      return dispatch('settings/throwError', error, { root: true });
    });
};

export default {
  getDbList,
  createDb,
  deleteDb,
};
