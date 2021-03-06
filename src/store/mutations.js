import types from './mutation-types';

export default {
  [types.GET_ENTITIES.REQUEST](state) {
    state.isLoading = true;
  },
  [types.GET_ENTITIES.FAIL](state) {
    state.isLoading = false;
    elapsedMs = null;
    requestPerformanceMs = null;
  },
  [types.GET_ENTITIES.SUCCESS](state, payload) {
    const { items, total, elapsedMs, isGreedy, requestPerformanceMs } = payload;

    state.items = isGreedy ? [...state.items, ...items] : items;
    state.total = total;
    state.elapsedMs = elapsedMs;
    state.isLoading = false;
    state.requestPerformanceMs = requestPerformanceMs;
  },
};
