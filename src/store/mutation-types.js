import createAsyncConstant from '@/utils/createAsyncConstant';

const asyncConstants = {
  GET_ENTITY_LIST: createAsyncConstant('getEntityList'),
};

export default {
  ...asyncConstants,
};
