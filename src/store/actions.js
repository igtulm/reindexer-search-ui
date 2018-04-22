import { ADD_TOAST_MESSAGE } from 'vuex-toast';
import EntitiesApi from '@/api';
import routes from '@/api/routes';
import ResultPresenter from '@/presenters/ResultPresenter';
import types from './mutation-types';

export const getEntities = (context, params) => {
  const { commit, dispatch } = context;
  const { isGreedy, queryParams } = params;

  commit(types.GET_ENTITIES.REQUEST);

  const isCancellableRequest = !isGreedy;

  const requestStartTime = performance.now();
  EntitiesApi.get(routes.search, queryParams, isCancellableRequest)
    .then(
      response => {
        const requestEndTime = performance.now();

        const { data } = response;
        const payload = {
          items: ResultPresenter.items(data),
          total: ResultPresenter.total(data),
          elapsedMs: ResultPresenter.elapsedMs(data),
          isGreedy,
          requestPerformanceMs: requestEndTime - requestStartTime,
        };

        commit(types.GET_ENTITIES.SUCCESS, payload);
      },
      error => {
        if (EntitiesApi.isCancel(error)) {
          return;
        }

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
