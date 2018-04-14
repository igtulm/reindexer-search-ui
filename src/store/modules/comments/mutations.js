import types from './mutation-types';

export default {
  [types.ITEMS_RESET](state) {
    state.list = [];
    state.total = 0;
    state.params = {};
    state.queryItems = [];
    state.isLoading = false;
  },

  [types.ITEMS_GET_LIST.REQUEST](state) {
    state.isLoading = true;
  },
  [types.ITEMS_GET_LIST.FAIL](state) {
    state.isLoading = false;
  },
  [types.ITEMS_GET_LIST.SUCCESS](state, payload) {
    const { list, total } = payload;

    state.list = list;
    state.total = total;
    state.isLoading = false;
  },

  [types.ITEMS_PARAMS_SET](state, payload) {
    const { params } = payload;

    state.params = params;
  },

  [types.ITEMS_DELETE.REQUEST](state) {
    state.isLoading = true;
  },
  [types.ITEMS_DELETE.FAIL](state) {
    state.isLoading = false;
  },
  [types.ITEMS_DELETE.SUCCESS](state) {
    state.isLoading = false;
  },

  [types.ITEMS_UPDATE.REQUEST](state) {
    state.isLoading = true;
  },
  [types.ITEMS_UPDATE.FAIL](state) {
    state.isLoading = false;
  },
  [types.ITEMS_UPDATE.SUCCESS](state) {
    state.isLoading = false;
  },

  [types.ITEMS_CREATE.REQUEST](state) {
    state.isLoading = true;
  },
  [types.ITEMS_CREATE.FAIL](state) {
    state.isLoading = false;
  },
  [types.ITEMS_CREATE.SUCCESS](state) {
    state.isLoading = false;
  },

  [types.ITEMS_GET_BY_QUERY.REQUEST](state) {
    state.isLoading = true;
  },
  [types.ITEMS_GET_BY_QUERY.FAIL](state) {
    state.isLoading = false;
  },
  [types.ITEMS_GET_BY_QUERY.SUCCESS](state, payload) {
    const { queryItems } = payload;

    state.queryItems = queryItems;
    state.isLoading = false;
  },
};
