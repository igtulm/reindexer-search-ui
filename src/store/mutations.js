import types from './mutation-types';

export default {
  [types.POSTS_GET_BY_QUERY.REQUEST](state) {
    state.isLoading = true;
  },
  [types.POSTS_GET_BY_QUERY.FAIL](state) {
    state.isLoading = false;
  },
  [types.POSTS_GET_BY_QUERY.SUCCESS](state, payload) {
    const { list, total } = payload;

    state.postsList = list;
    state.postsTotal = total;
    state.isLoading = false;
  },

  [types.COMMENTS_GET_BY_QUERY.REQUEST](state) {
    state.isLoading = true;
  },
  [types.COMMENTS_GET_BY_QUERY.FAIL](state) {
    state.isLoading = false;
  },
  [types.COMMENTS_GET_BY_QUERY.SUCCESS](state, payload) {
    const { list, total } = payload;

    state.commentsList = list;
    state.commentsTotal = total;
    state.isLoading = false;
  },
};
