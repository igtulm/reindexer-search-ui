import types from './mutation-types';

export default {
  [types.GET_ENTITIES.REQUEST](state) {
    state.isLoading = true;
  },
  [types.GET_ENTITIES.FAIL](state) {
    state.isLoading = false;
  },
  [types.GET_ENTITIES.SUCCESS](state, payload) {
    const { items, total, isGreedy } = payload;

    state.items = isGreedy ? [...state.items, items] : items;
    state.total = total;
    state.isLoading = false;
  },
};
