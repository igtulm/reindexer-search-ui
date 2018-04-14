import _ from 'lodash';
import resultGetter from '@/utils/resultGetter';

export default {
  fields: (state) => {
    const items = _.get(state, 'list', []);

    return resultGetter.fields(items);
  },
  queryFields: (state) => {
    const items = _.get(state, 'queryItems', []);

    return resultGetter.fields(items);
  },
  sortField: state => _.get(state, 'params.sortField', ''),
  sortDesc: state => _.get(state, 'params.sortDesc', false),
  pageSize: state => _.get(state, 'params.pageSize', 10),
  page: state => _.get(state, 'params.page', 1),
};
