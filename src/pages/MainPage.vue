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
            <b-form-select v-model="params.sortBy" :options="sortOptions" @change="onSearch" />
            <b-form-select
              class="ml-2"
              v-model="params.sortDesc"
              :options="sortDirOptions"
              :disabled="!isSortTypeDirected"
              @change="onSearch" />
          </b-form>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <component v-for="item, index in items" :is="component" v-bind="item" :key="index" />
        </b-col>
      </b-row>
      <b-row>
        <!--<b-pagination v-if="total" size="md" hide-ellipsis :limit="params.limit" :total-rows="total"
            :per-page="10" v-model="page" v-on:input="onPaginatorChange">
        </b-pagination>-->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';
import { Toast } from 'vuex-toast';
import SnippetPost from '@/components/SnippetPost';
import SnippetComment from '@/components/SnippetComment';

export default {
  name: 'search-page',

  components: {
    Toast,
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
      name: 'Posts',
      text: 'Posts',
      value: 'posts',
      debounce: 250,
      component: SnippetPost,
    }, {
      name: 'Posts',
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

      debounceDefault: 250,
      page: 1,
      tabNumSelected: 0,
      searchMode,

      params: {
        ...props,
      },
    };
  },

  computed: {
    ...mapState({
      items: state => state.items,
      total: state => state.total,
    }),

    currentSetting() {
      return this.searchSettings.find(item => item &&  item.text === this.searchMode);
    },

    entity() {
      if (_.isEmpty(this.currentSetting)) {
        return null;
      }

      return _.get(this.currentSetting, 'name', null);
    },

    component() {
      if (_.isEmpty(this.currentSetting)) {
        return '';
      }

      return _.get(this.currentSetting, 'component', '');
    },

    debounce() {
      if (_.isEmpty(this.currentSetting)) {
        return this.debounceDefault;
      }

      return _.get(this.currentSetting, 'debounce', this.debounceDefault);
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
  },

  methods: {
    ...mapActions({
      getEntities: 'getEntities',
    }),

    onSearch: _.debounce(function() {
      const queryParams = _.pickBy(this.params);
      const actionParams = {
        queryParams,
        entity: this.entity,
      };

      this.getEntities(actionParams).then(() => {
        this.$router.push({ path: this.$router.path, queryParams });
      });

    }, this.debounce),

    onSortModeChange(text) {
      const searchSetting = this.searchSettings.find(item => item.text === text);
      this.params.searchType = searchSetting.value;

      this.onSearch();
    },

    onInput(value) {
      this.params.query = value;

      this.onSearch();
    },

    onPaginatorChange(page) {
      this.page = page;

      this.onSearch();
    },
  },

  created() {
    if (this.params.query) {
      this.onSearch();
    }
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
