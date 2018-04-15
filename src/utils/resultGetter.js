import _ from 'lodash';

export default {
  items(data) {
    return _.get(data, 'items', []);
  },

  total(data) {
    const total = _.get(data, 'total_count', 0);

    return total;
  },
};
