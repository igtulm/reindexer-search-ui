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
            <b-form-select class="ml-2" v-model="params.sortDesc" :options="sortDirOptions" @change="onSearch" />
          </b-form>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <!--TODO: Use dynamic component!-->
          <snippet-post v-if="searchMode === searchSettings[0].text" v-for="item, index in list"
            :key="index"
            :user="item.user"
            :time="item.time"
            :title="item.title"
            :link="item.link"
            :image="item.image"
            :text="item.text"
            :tags="item.tags"
            :hubs="item.hubs"
            :likes="item.likes"
            :favorites="item.favorites"
            :views="item.views"
          />
          <!--TODO: Use dynamic component!-->
          <snippet-comment v-if="searchMode === searchSettings[1].text" v-for="item, index in list"
            :key="index"
            :user="item.user"
            :time="item.time"
            :link="item.link"
            :text="item.text"
            :likes="item.likes"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-pagination v-if="total" size="md" hide-ellipsis :limit="params.limit" :total-rows="total"
            :per-page="10" v-model="page" v-on:input="onPaginatorChange">
        </b-pagination>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
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
      text: 'Posts',
      value: 'posts',
      action: 'getPostsByQuery',
      debounce: 250,
    }, {
      text: 'Comments',
      value: 'comments',
      action: 'getCommentsByQuery',
      debounce: 100,
    }];

    const sortOptions = [{
      value: '',
      text: 'Relevance',
    }, {
      value: 'time',
      text: 'Time',
    }, {
      value: 'likes',
      text: 'Likes',
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
      list: state => state.list,
      total: state => state.total,
    }),

    debounce() {
      const searchSetting = this.searchSettings.find(item => item.text === this.searchMode);
      if (_.isEmpty(searchSetting)) {
        return this.debounceDefault;
      }

      return _.get(searchSetting, 'debounce', this.debounceDefault);
    },

    action() {
      const searchSetting = this.searchSettings.find(item => item.text === this.searchMode);
      if (_.isEmpty(searchSetting)) {
        return null;
      }

      return _.get(searchSetting, 'action', null);
    },
  },

  methods: {
    onSearch: _.debounce(function() {
      const query = _.pickBy(this.params);

      this.$store.dispatch(this.action, this.params).then(() => {
        this.$router.push({ path: this.$router.path, query });
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
