<template>
  <div class="page-wrapper">
    <toast position="se" />
    <div class="search-wrapper">
      <searcher v-model="searchString" @input="onInput" @search="onSearch" />
      <tabs class="tabs" :items="tabs" @select="onTabSelect" />
      <paginator class="paginator" :totalItems="100" :itemsPerPage="10" :page="1" @onchange="onPaginatorChange" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vuex-toast';
import Searcher from '@/components/Searcher';
import Tabs from '@/components/Tabs';
import Paginator from '@/components/Paginator';
import webroutes from '@/router/webroutes';

export default {
  name: 'search-page',

  components: {
    Toast,
    Searcher,
    Tabs,
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
    };
  },

  methods: {
    onInput(value) {
      console.log('Input: ', value);
    },

    onSearch(value) {
      const params = {
        query: value,
      };

      // TODO need refactoring
      const action = this.tabNumSelected == 0 ? 'getPostsByQuery' : 'getCommentsByQuery';

      this.$store.dispatch(action, params).then(() => {
        this.$router.push({ path: webroutes.searchPage, query: { query: this.searchString } });
      });
    },

    onTabSelect(value) {
      this.tabNumSelected = value;

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
      console.log(page);
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

.paginator {
  margin: 10px 0 0 173px;
}
</style>
