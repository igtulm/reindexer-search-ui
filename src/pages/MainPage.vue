<template>
  <div class="page-wrapper">
    <searcher class="searcher" v-model="searchString" @input="onInput" @search="onSearch" />
  </div>
</template>

<script>
import Searcher from '@/components/Searcher';

export default {
  name: 'main-page',

  components: {
    Searcher,
  },

  data() {
    return {
      searchString: '',
    };
  },

  methods: {
    onInput(value) {
      console.log('Input: ', value);
    },

    onSearch(value) {
      console.log('Search: ', value);
    },
  },
};
</script>

<style scoped>
.page-wrapper {
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
