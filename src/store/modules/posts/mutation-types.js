import createAsyncConstant from '@/utils/createAsyncConstant';

const asyncConstants = {
  DB_GET_LIST: createAsyncConstant('getDbList'),
  DB_DELETE: createAsyncConstant('deleteDb'),
  DB_CREATE: createAsyncConstant('createDb'),
};

export default {
  ...asyncConstants,
};
