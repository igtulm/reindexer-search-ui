import createAsyncConstant from '@/utils/createAsyncConstant';

const asyncConstants = {
  POSTS_GET_BY_QUERY: createAsyncConstant('getPostsByQuery'),
  COMMENTS_GET_BY_QUERY: createAsyncConstant('getCommentsByQuery'),
};

export default {
  ...asyncConstants,
};
