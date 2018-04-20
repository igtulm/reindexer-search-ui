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

    if (isGreedy) {
      state.items = [...state.items, ...items];
    } else {
      state.items = items;
    }

    state.total = total;
    state.isLoading = false;
  },
};
