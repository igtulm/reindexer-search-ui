<template>
  <div class="page-wrapper">
    <searcher v-model="searchString" @input="onInput" @search="onSearch" />
    <tabs class="tabs" :items="tabs" @select="onSelect" />
  </div>
</template>

<script>
import Searcher from '@/components/Searcher';
import Tabs from '@/components/Tabs';

export default {
  name: 'search-page',

  components: {
    Searcher,
    Tabs,
  },

  data() {
    return {
      searchString: '',
      tabs: [ 'Comments', 'Posts' ],
    };
  },

  methods: {
    onInput(value) {
      console.log('Input: ', value);
    },

    onSearch(value) {
      console.log('Search: ', value);
    },

    onSelect(value) {
      console.log('Select: ', value);
    }
  },
};
</script>

<style scoped>
.page-wrapper {
  border-bottom: 1px solid #e5e5e5;
}

.tabs {
  margin: 10px 0 0 200px;
  padding-bottom: 10px;
}
</style>
