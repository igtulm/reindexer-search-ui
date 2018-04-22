<template>
  <div>
    <toast position="se" />

    <b-container class="ml-5">
      <b-row class="mt-3">
        <b-col>
          <img class="logo float-left" src="../assets/reindexer-logo.png">
          <h3>Reindexer</h3>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-input class="search-field" placeholder="Search" autofocus v-model.trim="params.query" @input="onInput" @keydown.enter.native="onSearch" />
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-form inline>
            <b-form-radio-group v-model="searchMode" @change="onSortModeChange">
              <b-form-radio v-for="option, index in searchOptions" :key="index" :value="option">{{ option }}</b-form-radio>
            </b-form-radio-group>
            <b-form-select v-model="params.sortBy" :options="sortOptions" @change="onSortByChange" />
            <b-form-select
              class="ml-2"
              v-model="params.sortDesc"
              :options="sortDirOptions"
              :disabled="!isSortTypeDirected"
              @change="onSortDescChange" />
          </b-form>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <div v-infinite-scroll="onScroll">
            <component v-for="item, index in items" :is="component" v-bind="item" :key="index" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <spinner
            v-show="isLoading"
            size="large"
            class="position-fixed fixed-bottom mb-2"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vuex-toast';
import Spinner from 'vue-simple-spinner'
import SnippetPost from '@/components/SnippetPost';
import SnippetComment from '@/components/SnippetComment';

export default {
  name: 'main-page',

  components: {
    Toast,
    Spinner,
    SnippetPost,
    SnippetComment,
  },

  props: {
    query: {
      default: '',
    },

    limit: {
      type: Number,
      default: 10,
    },

    offset: {
      type: Number,
      default: 0,
    },

    sortBy: {
      type: String,
      default: '',
    },

    sortDesc: {
      type: Number,
      default: 0,
    },

    searchType: {
      type: String,
      default: null,
    },
  },

  data() {
    const props = this.$props;

    const searchSettings = [{
      text: 'Posts',
      value: 'posts',
      debounce: 250,
      component: SnippetPost,
    }, {
      text: 'Comments',
      value: 'comments',
      debounce: 100,
      component: SnippetComment,
    }];

    const sortOptions = [{
      value: '',
      text: 'Relevance',
      isDirected: false,
    }, {
      value: 'time',
      text: 'Time',
      isDirected: true,
    }, {
      value: 'likes',
      text: 'Likes',
      isDirected: true,
    }];

    const sortDirOptions = [{
      value: 0,
      text: 'Asc',
    }, {
      value: 1,
      text: 'Desc',
    }];

    const findSearchMode = searchSettings.find(item => item.text && item.value === props.searchType);
    const searchMode = findSearchMode && findSearchMode.text || searchSettings[0].text;

    return {
      searchSettings,
      searchOptions: _.map(searchSettings, setting => setting.text),
      sortOptions,
      sortDirOptions,

      page: 1,
      searchMode,

      params: {
        ...props,
      },

      scrollOffset: props.offset,
    };
  },

  computed: {
    ...mapState({
      items: state => state.items,
      total: state => state.total,
      isLoading: state => state.isLoading,
    }),

    currentSetting() {
      return this.searchSettings.find(item => item &&  item.text === this.searchMode);
    },

    component() {
      if (_.isEmpty(this.currentSetting)) {
        return '';
      }

      return _.get(this.currentSetting, 'component', '');
    },

    debounce() {
      if (_.isEmpty(this.currentSetting)) {
        return 0;
      }

      return _.get(this.currentSetting, 'debounce', 0);
    },

    action() {
      if (_.isEmpty(this.currentSetting)) {
        return null;
      }

      return _.get(this.currentSetting, 'action', null);
    },

    isSortTypeDirected() {
      const sortOption = this.sortOptions.find(item => item && item.value === this.params.sortBy) || this.sortOptions[0];

      return sortOption.isDirected || false;
    },

    itemsSize() {
      return _.size(this.items);
    }
  },

  methods: {
    ...mapActions({
      getEntities: 'getEntities',
    }),

    onSearch: _.debounce(function() {
      const queryParams = _.pickBy(this.params);
      const actionParams = {
        queryParams,
      };

      this.getEntities(actionParams);

      const query = _.mapKeys(queryParams, (value, key) => _.snakeCase(key));
      this.$router.push({ path: this.$router.path, query });

    }, this.debounce),

    onScroll() {
      if (this.isLoading || this.itemsSize === 0 || this.itemsSize === this.total) {
        return;
      }

      const compactQueryParams = _.pickBy(this.params);
      this.scrollOffset = this.scrollOffset + this.limit;
      const queryParams = {
        ...compactQueryParams,
        offset: this.scrollOffset,
      };

      const actionParams = {
        queryParams,
        isGreedy: true,
      };

      this.getEntities(actionParams);
    },

    onSortModeChange(text) {
      const searchSetting = this.searchSettings.find(item => item.text === text);
      this.params.searchType = searchSetting.value;
      this.params.offset = 0;
      this.scrollOffset = 0;

      this.onSearch();
    },

    onSortByChange() {
      this.params.offset = 0;
      this.scrollOffset = 0;

      this.onSearch();
    },

    onSortDescChange() {
      this.params.offset = 0;
      this.scrollOffset = 0;

      this.onSearch();
    },

    onInput(value) {
      this.params.query = value;
      this.params.offset = 0;
      this.scrollOffset = 0;

      this.onSearch();
    },

    mousewheelHandler(event) {
      if (event.deltaY === 1) {
        event.preventDefault();
      }
    }
  },

  created() {
    window.addEventListener('mousewheel', this.mousewheelHandler);

    if (this.params.query) {
      this.onSearch();
    }
  },

  destroyed() {
    window.removeEventListener('mousewheel', this.mousewheelHandler);
  },
};
</script>

<style scoped>
.logo {
  margin-top: -2px;
}

.search-field {
  width: 780px;
}
</style>
