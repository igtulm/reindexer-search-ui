import types from './mutation-types';

export default {
  [types.GET_ENTITIES.REQUEST](state) {
    state.isLoading = true;
  },
  [types.GET_ENTITIES.FAIL](state) {
    state.isLoading = false;
  },
  [types.GET_ENTITIES.SUCCESS](state, payload) {
    const { list, total, isGreedy } = payload;

    state.list = isGreedy ? [...state.list, list] : list;
    state.total = total;
    state.isLoading = false;
  },
};
