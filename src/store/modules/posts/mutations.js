import types from './mutation-types';

export default {
  [types.DB_GET_LIST.REQUEST](state) {
    state.isLoading = true;
  },
  [types.DB_GET_LIST.FAIL](state) {
    state.isLoading = false;
  },
  [types.DB_GET_LIST.SUCCESS](state, payload) {
    state.list = payload.list;
    state.isLoading = false;
  },

  [types.DB_DELETE.REQUEST](state) {
    state.isLoading = true;
  },
  [types.DB_DELETE.FAIL](state) {
    state.isLoading = false;
  },
  [types.DB_DELETE.SUCCESS](state) {
    state.isLoading = false;
  },

  [types.DB_CREATE.REQUEST](state) {
    state.isLoading = true;
  },
  [types.DB_CREATE.FAIL](state) {
    state.isLoading = false;
  },
  [types.DB_CREATE.SUCCESS](state) {
    state.isLoading = false;
  },
};
