<template>
  <div class="page-wrapper">
    <toast position="se" />
    <div class="search-wrapper">
      <searcher class="searcher" v-model="searchString" @input="onInput" @search="onSearch" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vuex-toast';
import Searcher from '@/components/Searcher';
import webroutes from '@/router/webroutes';

export default {
  name: 'main-page',

  components: {
    Toast,
    Searcher,
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
    };
  },

  methods: {
    onInput(value) {
      // console.log('Input: ', value);
    },

    onSearch(value) {
      const params = {
        query: value,
      };

      this.$store.dispatch('getPostsByQuery', params).then(() => {
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
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.searcher {
  text-align: center;
}
</style>
