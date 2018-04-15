import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { createModule } from 'vuex-toast';

import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  list: [],
  total: 0,
  isLoading: false,
};

export default new Vuex.Store({
  modules: {
    toast: createModule({
      dismissInterval: 5000,
    }),
  },
  actions,
  mutations,
  getters() {},
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
