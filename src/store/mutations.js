import types from './mutation-types';

export default {
  [types.GET_ENTITY_LIST.REQUEST](state) {
    state.isLoading = true;
  },
  [types.GET_ENTITY_LIST.FAIL](state) {
    state.isLoading = false;
  },
  [types.GET_ENTITY_LIST.SUCCESS](state, payload) {
    const { list, total, isGreedy } = payload;

    state.list = isGreedy ? [...state.list, list] : list;
    state.total = total;
    state.isLoading = false;
  },
};
