<template>
  <div>
    <div class="search-wrapper">
        <img class="logo" src="../assets/reindexer-logo.png">
        <p class="name">Reindexer</p>
        <input class="field" type="text" ref="searchliner" autofocus :value="value" @input="onUpdate()" @keyup.enter="onSearch()"/>
        <button class="btn" v-on:click="onSearch()">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searcher',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  methods: {
    onUpdate() {
      this.$emit('input', this.$refs.searchliner.value);
    },

    onSearch() {
      this.$emit('search', this.$refs.searchliner.value)
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  display: grid;
  grid-template-columns: 40px 160px 450px 100px;
  font-family: "Lucida Console", Monaco, monospace;
  width: 100%;
}

.logo {
  margin-top: 15px;
}

.name {
  font-size: 24px;
  margin-top: 25px;
}

.field {
  height: 32px;
  margin-top: 20px;
  outline: none;
  font-size: 18px;
  padding-left: 5px;
}

.btn {
  height: 38px;
  margin-top: 20px;
  font-size: 18px;
}

</style>
