import _ from 'lodash';

export default {
  items(data) {
    return _.get(data, 'items', []);
  },

  total(data) {
    return _.get(data, 'total_count', 0);
  },

  elapsedMs(data) {
    return _.get(data, 'elapsed_ms', 0);
  },
};
