import createAsyncConstant from '@/utils/createAsyncConstant';

const asyncConstants = {
  GET_ENTITIES: createAsyncConstant('getEntityList'),
};

export default {
  ...asyncConstants,
};
