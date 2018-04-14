import keyMirror from 'keymirror';
import createAsyncConstant from '@/utils/createAsyncConstant';

const asyncConstants = {
  ITEMS_GET_LIST: createAsyncConstant('getItemsList'),
  ITEMS_GET_BY_QUERY: createAsyncConstant('getItemsByQuery'),
  ITEMS_DELETE: createAsyncConstant('deleteItem'),
  ITEMS_UPDATE: createAsyncConstant('updateItem'),
  ITEMS_CREATE: createAsyncConstant('createItem'),
};

const constants = keyMirror({
  ITEMS_PARAMS_SET: null,
  ITEMS_RESET: null,
});

export default {
  ...asyncConstants,
  ...constants,
};
