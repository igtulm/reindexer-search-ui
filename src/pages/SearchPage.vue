<template>
  <div class="page-wrapper">
    <toast position="se" />
    <div class="search-wrapper">
      <searcher v-model="searchString" @input="onInput" @search="onSearch" />
      <tabs class="tabs" :items="tabs" @select="onTabSelect" />
    </div>
    <viewer class="result-viewer" :items="list" />
    <paginator v-if="total" class="paginator" :totalItems="total" :itemsPerPage="limit" :page="page" @onchange="onPaginatorChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vuex-toast';
import Searcher from '@/components/Searcher';
import Tabs from '@/components/Tabs';
import Viewer from '@/components/Viewer';
import Paginator from '@/components/Paginator';
import webroutes from '@/router/webroutes';

export default {
  name: 'search-page',

  components: {
    Toast,
    Searcher,
    Tabs,
    Viewer,
    Paginator,
  },

  props: {
    query: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      searchString: this.query || '',
      tabs: [ 'Posts', 'Comments' ],
      tabNumSelected: 0,
      offset: 0,
      limit: 10,
      page: 1,
    };
  },

  computed: {
    ...mapState({
      list: state => state.list,
      total: state => state.total,
    }),
  },

  methods: {
    onInput(value) {
      // console.log('Input: ', value);
    },

    onSearch(value) {
      const params = {
        query: value,
        limit: this.limit,
        offset: this.offset,
      };

      // TODO need refactoring
      const action = this.tabNumSelected == 0 ? 'getPostsByQuery' : 'getCommentsByQuery';

      this.$store.dispatch(action, params).then(() => {
        this.$router.push({ path: webroutes.searchPage, query: { query: this.searchString } });
      });
    },

    onTabSelect(value) {
      this.tabNumSelected = value;
      this.page = 1;

      // TODO need refactoring
      const action = this.tabNumSelected == 0 ? 'getPostsByQuery' : 'getCommentsByQuery';

      const params = {
        query: this.searchString,
      };

      this.$store.dispatch(action, params).then(() => {
        this.$router.push({ path: webroutes.searchPage, query: { query: this.searchString } });
      });
    },

    onPaginatorChange(page) {
      this.page = page;

      const params = {
        query: this.searchString,
        limit: this.limit,
        offset: (page - 1) * this.limit,
      };

      // TODO need refactoring
      const action = this.tabNumSelected == 0 ? 'getPostsByQuery' : 'getCommentsByQuery';

      this.$store.dispatch(action, params).then(() => {
        this.$router.push({ path: webroutes.searchPage, query: { query: this.searchString } });
      });
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  height: 100%;
}

.search-wrapper {
  border-bottom: 1px solid #e5e5e5;
}

.tabs {
  margin: 10px 0 0 173px;
  padding-bottom: 10px;
}

.result-viewer {
  width: 600px;
  margin: 10px 0 0 173px;
}

.paginator {
  margin: 10px 0 0 173px;
  padding-bottom: 100px;
}
</style>
